#!/usr/bin/env node

/**
 * AarogyaCare Database Migration Runner
 * 
 * Usage:
 *   node migrate.js up                    # Run all pending up migrations
 *   node migrate.js down                  # Run all pending down migrations
 *   node migrate.js up 001                # Run specific migration up
 *   node migrate.js down 001              # Run specific migration down
 *   node migrate.js status                # Show migration status
 */

const { Client } = require('pg');
const fs = require('fs').promises;
const path = require('path');
const { DB_CONFIG } = require('./config');

// Migration table name
const MIGRATION_TABLE = 'schema_migrations';

class MigrationRunner {
  constructor() {
    this.client = new Client(DB_CONFIG);
    this.migrationsDir = path.join(__dirname, 'migrations');
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('✅ Connected to PostgreSQL database');
    } catch (error) {
      console.error('❌ Failed to connect to database:', error.message);
      console.log('');
      console.log('🔧 Database Connection Help:');
      console.log('   1. Make sure PostgreSQL is running');
      console.log('   2. Set your database credentials in database/config.js');
      console.log('   3. Or set environment variables:');
      console.log('      DB_HOST=localhost');
      console.log('      DB_PORT=5432');
      console.log('      DB_NAME=aarogyacare');
      console.log('      DB_USER=postgres');
      console.log('      DB_PASSWORD=your_password');
      console.log('');
      process.exit(1);
    }
  }

  async disconnect() {
    await this.client.end();
    console.log('🔌 Disconnected from database');
  }

  async createMigrationsTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS ${MIGRATION_TABLE} (
        id SERIAL PRIMARY KEY,
        version VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    try {
      await this.client.query(query);
      console.log('✅ Migration table created/verified');
    } catch (error) {
      console.error('❌ Failed to create migration table:', error.message);
      throw error;
    }
  }

  async getMigrationFiles() {
    try {
      const files = await fs.readdir(this.migrationsDir);
      const migrationFiles = files
        .filter(file => file.endsWith('.up.sql') || file.endsWith('.down.sql'))
        .map(file => {
          const match = file.match(/^(\d+)_(.+)\.(up|down)\.sql$/);
          if (match) {
            return {
              version: match[1],
              name: match[2],
              direction: match[3],
              filename: file,
              fullPath: path.join(this.migrationsDir, file)
            };
          }
          return null;
        })
        .filter(Boolean)
        .sort((a, b) => parseInt(a.version) - parseInt(b.version));

      return migrationFiles;
    } catch (error) {
      console.error('❌ Failed to read migration files:', error.message);
      throw error;
    }
  }

  async getExecutedMigrations() {
    try {
      const result = await this.client.query(
        `SELECT version, name FROM ${MIGRATION_TABLE} ORDER BY version`
      );
      return result.rows;
    } catch (error) {
      console.error('❌ Failed to get executed migrations:', error.message);
      throw error;
    }
  }

  async executeMigration(migration, direction) {
    const { version, name, fullPath } = migration;
    
    try {
      console.log(`🔄 Executing ${direction} migration: ${version}_${name}`);
      
      // Read migration file
      const sql = await fs.readFile(fullPath, 'utf8');
      
      // Execute migration
      await this.client.query('BEGIN');
      await this.client.query(sql);
      
      if (direction === 'up') {
        // Record migration as executed
        await this.client.query(
          `INSERT INTO ${MIGRATION_TABLE} (version, name) VALUES ($1, $2)`,
          [version, name]
        );
      } else {
        // Remove migration record
        await this.client.query(
          `DELETE FROM ${MIGRATION_TABLE} WHERE version = $1`,
          [version]
        );
      }
      
      await this.client.query('COMMIT');
      console.log(`✅ Successfully executed ${direction} migration: ${version}_${name}`);
      
    } catch (error) {
      await this.client.query('ROLLBACK');
      console.error(`❌ Failed to execute ${direction} migration ${version}_${name}:`, error.message);
      throw error;
    }
  }

  async runUp(targetVersion = null) {
    const files = await this.getMigrationFiles();
    
    // For development: Always start fresh by dropping all tables
    console.log('🧹 Cleaning existing database for fresh start...');
    await this.cleanDatabase();
    
    // Recreate the migration table after cleanup
    await this.createMigrationsTable();
    
    const pendingMigrations = files
      .filter(file => file.direction === 'up')
      .filter(file => !targetVersion || file.version === targetVersion);

    if (pendingMigrations.length === 0) {
      console.log('✅ No migrations to run');
      return;
    }

    console.log(`🚀 Running ${pendingMigrations.length} migration(s) on fresh database...`);
    
    for (const migration of pendingMigrations) {
      await this.executeMigration(migration, 'up');
    }
    
    console.log('🎉 All migrations completed successfully!');
  }

  async cleanDatabase() {
    try {
      // Drop all tables in the correct order (child tables first)
      const dropQueries = [
        'DROP TABLE IF EXISTS audit_logs CASCADE',
        'DROP TABLE IF EXISTS equipment_assignments CASCADE',
        'DROP TABLE IF EXISTS reviews CASCADE',
        'DROP TABLE IF EXISTS lab_results CASCADE',
        'DROP TABLE IF EXISTS prescriptions CASCADE',
        'DROP TABLE IF EXISTS medical_records CASCADE',
        'DROP TABLE IF EXISTS credentials CASCADE',
        'DROP TABLE IF EXISTS payments CASCADE',
        'DROP TABLE IF EXISTS bookings CASCADE',
        'DROP TABLE IF EXISTS insurance CASCADE',
        'DROP TABLE IF EXISTS equipment CASCADE',
        'DROP TABLE IF EXISTS services CASCADE',
        'DROP TABLE IF EXISTS healthcare_professionals CASCADE',
        'DROP TABLE IF EXISTS users CASCADE',
        'DROP TABLE IF EXISTS schema_migrations CASCADE'
      ];

      for (const query of dropQueries) {
        await this.client.query(query);
      }
      
      console.log('✅ Database cleaned successfully');
    } catch (error) {
      console.error('❌ Failed to clean database:', error.message);
      throw error;
    }
  }

  async runDown(targetVersion = null) {
    const files = await this.getMigrationFiles();
    const executed = await this.getExecutedMigrations();
    
    if (targetVersion) {
      // Run specific migration down
      const migration = files.find(f => f.version === targetVersion && f.direction === 'down');
      if (!migration) {
        console.error(`❌ Migration ${targetVersion} not found or no down migration available`);
        return;
      }
      
      const isExecuted = executed.some(m => m.version === targetVersion);
      if (!isExecuted) {
        console.error(`❌ Migration ${targetVersion} has not been executed`);
        return;
      }
      
      await this.executeMigration(migration, 'down');
      return;
    }

    // Run all migrations down (in reverse order)
    const executedVersions = new Set(executed.map(m => m.version));
    const downMigrations = files
      .filter(file => file.direction === 'down')
      .filter(file => executedVersions.has(file.version))
      .reverse();

    if (downMigrations.length === 0) {
      console.log('✅ No migrations to rollback');
      return;
    }

    console.log(`🔄 Rolling back ${downMigrations.length} migration(s)...`);
    
    for (const migration of downMigrations) {
      await this.executeMigration(migration, 'down');
    }
    
    console.log('🎉 All migrations rolled back successfully!');
  }

  async showStatus() {
    const files = await this.getMigrationFiles();
    const executed = await this.getExecutedMigrations();
    const executedVersions = new Set(executed.map(m => m.version));
    
    console.log('\n📊 Migration Status:');
    console.log('==================');
    
    const upMigrations = files.filter(f => f.direction === 'up');
    
    for (const migration of upMigrations) {
      const status = executedVersions.has(migration.version) ? '✅ EXECUTED' : '⏳ PENDING';
      const executedAt = executed.find(m => m.version === migration.version)?.executed_at;
      
      console.log(`${migration.version.padStart(3, '0')}_${migration.name.padEnd(30)} ${status}`);
      if (executedAt) {
        console.log(`    └─ Executed: ${executedAt}`);
      }
    }
    
    console.log(`\n📈 Summary: ${executed.length}/${upMigrations.length} migrations executed`);
    console.log('\n💡 Development Mode: Running migrations will always start fresh (drop all tables)');
  }
}

async function main() {
  const command = process.argv[2];
  const targetVersion = process.argv[3];
  
  if (!command || !['up', 'down', 'status'].includes(command)) {
    console.log(`
Usage:
  node migrate.js up                    # Run all pending up migrations
  node migrate.js down                  # Run all pending down migrations
  node migrate.js up 001                # Run specific migration up
  node migrate.js down 001              # Run specific migration down
  node migrate.js status                # Show migration status
    `);
    process.exit(1);
  }

  const runner = new MigrationRunner();
  
  try {
    await runner.connect();
    await runner.createMigrationsTable();
    
    switch (command) {
      case 'up':
        await runner.runUp(targetVersion);
        break;
      case 'down':
        await runner.runDown(targetVersion);
        break;
      case 'status':
        await runner.showStatus();
        break;
    }
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await runner.disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = MigrationRunner;
