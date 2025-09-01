#!/usr/bin/env node

/**
 * AarogyaCare Database Setup Script
 * 
 * This script automatically sets up the database for new developers:
 * 1. Creates the database if it doesn't exist
 * 2. Runs all migrations
 * 3. Provides helpful feedback
 * 
 * Usage: npm run db:setup
 */

const { Client } = require('pg');
const { execSync } = require('child_process');
const { DB_CONFIG } = require('./config');

class DatabaseSetup {
  constructor() {
    this.config = DB_CONFIG;
    this.databaseName = this.config.database;
  }

  async setup() {
    console.log('🚀 Setting up AarogyaCare database...\n');

    try {
      // Step 1: Check PostgreSQL connection
      await this.checkPostgreSQLConnection();

      // Step 2: Create database if it doesn't exist
      await this.createDatabaseIfNotExists();

      // Step 3: Run migrations
      await this.runMigrations();

      // Step 4: Verify setup
      await this.verifySetup();

      console.log('\n🎉 Database setup completed successfully!');
      console.log('\n📋 Next steps:');
      console.log('   1. Start the development server: npm run dev');
      console.log('   2. Open the app on your device/simulator');
      console.log('   3. Check database connection: npm run db:connect');
      console.log('\n💡 Useful commands:');
      console.log('   - npm run db:migrate:status  # Check migration status');
      console.log('   - npm run db:connect         # Connect to database');
      console.log('   - npm run db:migrate:up      # Re-run migrations (fresh start)');

    } catch (error) {
      console.error('\n❌ Database setup failed:', error.message);
      console.log('\n🔧 Troubleshooting:');
      console.log('   1. Make sure PostgreSQL is installed and running');
      console.log('   2. Check your database credentials in database/config.js');
      console.log('   3. Ensure you have permission to create databases');
      console.log('   4. Try running: createdb aarogyacare (manual creation)');
      process.exit(1);
    }
  }

  async checkPostgreSQLConnection() {
    console.log('🔍 Checking PostgreSQL connection...');
    
    // Try to connect to PostgreSQL server (without specifying database)
    const client = new Client({
      host: this.config.host,
      port: this.config.port,
      user: this.config.user,
      password: this.config.password,
      database: 'postgres' // Connect to default postgres database
    });

    try {
      await client.connect();
      console.log('✅ PostgreSQL server is accessible');
      await client.end();
    } catch (error) {
      throw new Error(`Cannot connect to PostgreSQL server: ${error.message}`);
    }
  }

  async createDatabaseIfNotExists() {
    console.log(`📦 Creating database '${this.databaseName}' if it doesn't exist...`);
    
    const client = new Client({
      host: this.config.host,
      port: this.config.port,
      user: this.config.user,
      password: this.config.password,
      database: 'postgres' // Connect to default postgres database
    });

    try {
      await client.connect();
      
      // Check if database exists
      const result = await client.query(
        "SELECT 1 FROM pg_database WHERE datname = $1",
        [this.databaseName]
      );

      if (result.rows.length === 0) {
        // Database doesn't exist, create it
        await client.query(`CREATE DATABASE "${this.databaseName}"`);
        console.log(`✅ Database '${this.databaseName}' created successfully`);
      } else {
        console.log(`✅ Database '${this.databaseName}' already exists`);
      }

      await client.end();
    } catch (error) {
      throw new Error(`Failed to create database: ${error.message}`);
    }
  }

  async runMigrations() {
    console.log('🔄 Running database migrations...');
    
    try {
      // Run the migration script
      execSync('node database/migrate.js up', { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
      console.log('✅ Migrations completed successfully');
    } catch (error) {
      throw new Error(`Migration failed: ${error.message}`);
    }
  }

  async verifySetup() {
    console.log('🔍 Verifying database setup...');
    
    const client = new Client(this.config);
    
    try {
      await client.connect();
      
      // Check if tables exist
      const result = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
        ORDER BY table_name
      `);

      const tableCount = result.rows.length;
      console.log(`✅ Database contains ${tableCount} tables`);
      
      if (tableCount > 0) {
        console.log('📋 Tables found:');
        result.rows.forEach(row => {
          console.log(`   - ${row.table_name}`);
        });
      }

      await client.end();
    } catch (error) {
      throw new Error(`Verification failed: ${error.message}`);
    }
  }
}

// Run setup if called directly
if (require.main === module) {
  const setup = new DatabaseSetup();
  setup.setup();
}

module.exports = DatabaseSetup;
