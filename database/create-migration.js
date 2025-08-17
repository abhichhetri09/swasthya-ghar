#!/usr/bin/env node

/**
 * AarogyaCare Migration File Generator
 * 
 * Usage:
 *   npm run db:create-migration add_user_profile_fields
 *   npm run db:create-migration create_notifications_table
 *   npm run db:create-migration update_booking_status_enum
 */

const fs = require('fs').promises;
const path = require('path');

class MigrationGenerator {
  constructor() {
    this.migrationsDir = path.join(__dirname, 'migrations');
  }

  async getNextMigrationNumber() {
    try {
      const files = await fs.readdir(this.migrationsDir);
      const migrationFiles = files
        .filter(file => file.endsWith('.up.sql'))
        .map(file => {
          const match = file.match(/^(\d+)_(.+)\.up\.sql$/);
          return match ? parseInt(match[1]) : 0;
        })
        .filter(num => num > 0);

      const maxNumber = migrationFiles.length > 0 ? Math.max(...migrationFiles) : 0;
      return (maxNumber + 1).toString().padStart(3, '0');
    } catch (error) {
      console.error('❌ Failed to read migration directory:', error.message);
      throw error;
    }
  }

  generateUpMigration(migrationName) {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[-:]/g, '').replace('T', '_');
    
    return `-- ============================================================================
-- AAROGYACARE HEALTHCARE DATABASE MIGRATION
-- ${migrationName.replace(/_/g, ' ').toUpperCase()} (UP Migration)
-- Generated: ${new Date().toISOString()}
-- ============================================================================

-- TODO: Add your UP migration SQL here
-- Examples:
--   ALTER TABLE users ADD COLUMN new_field VARCHAR(255);
--   CREATE TABLE new_table (id UUID PRIMARY KEY DEFAULT uuid_generate_v4());
--   CREATE INDEX idx_table_field ON table_name(field_name);

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
`;
  }

  generateDownMigration(migrationName) {
    return `-- ============================================================================
-- AAROGYACARE HEALTHCARE DATABASE MIGRATION
-- ${migrationName.replace(/_/g, ' ').toUpperCase()} (DOWN Migration)
-- Generated: ${new Date().toISOString()}
-- ============================================================================

-- TODO: Add your DOWN migration SQL here (rollback logic)
-- Examples:
--   ALTER TABLE users DROP COLUMN IF EXISTS new_field;
--   DROP TABLE IF EXISTS new_table CASCADE;
--   DROP INDEX IF EXISTS idx_table_field;

-- ============================================================================
-- MIGRATION ROLLBACK COMPLETE
-- ============================================================================
`;
  }

  async createMigrationFiles(migrationName) {
    try {
      // Ensure migrations directory exists
      await fs.mkdir(this.migrationsDir, { recursive: true });

      const migrationNumber = await this.getNextMigrationNumber();
      const upFileName = `${migrationNumber}_${migrationName}.up.sql`;
      const downFileName = `${migrationNumber}_${migrationName}.down.sql`;
      
      const upPath = path.join(this.migrationsDir, upFileName);
      const downPath = path.join(this.migrationsDir, downFileName);

      // Generate migration content
      const upContent = this.generateUpMigration(migrationName);
      const downContent = this.generateDownMigration(migrationName);

      // Write files
      await fs.writeFile(upPath, upContent);
      await fs.writeFile(downPath, downContent);

      console.log('✅ Migration files created successfully!');
      console.log(`📁 Up migration:   ${upFileName}`);
      console.log(`📁 Down migration: ${downFileName}`);
      console.log('');
      console.log('🚀 Next steps:');
      console.log(`   1. Edit ${upFileName} with your schema changes`);
      console.log(`   2. Edit ${downFileName} with your rollback logic`);
      console.log(`   3. Run: npm run db:migrate:up`);
      console.log('');
      console.log('💡 Migration tips:');
      console.log('   - Always test your down migration before deploying');
      console.log('   - Use transactions for complex migrations');
      console.log('   - Add appropriate indexes for performance');
      console.log('   - Consider data migration for existing records');

    } catch (error) {
      console.error('❌ Failed to create migration files:', error.message);
      throw error;
    }
  }
}

async function main() {
  const migrationName = process.argv[2];
  
  if (!migrationName) {
    console.log(`
🔧 AarogyaCare Migration Generator

Usage:
  npm run db:create-migration <migration_name>

Examples:
  npm run db:create-migration add_user_profile_fields
  npm run db:create-migration create_notifications_table
  npm run db:create-migration update_booking_status_enum
  npm run db:create-migration add_index_to_users_email

Migration naming conventions:
  - Use snake_case
  - Be descriptive but concise
  - Start with action (add, create, update, remove, etc.)
  - Include table/field names
    `);
    process.exit(1);
  }

  // Validate migration name
  if (!/^[a-z][a-z0-9_]*$/.test(migrationName)) {
    console.error('❌ Invalid migration name. Use only lowercase letters, numbers, and underscores.');
    console.error('   Example: add_user_profile_fields');
    process.exit(1);
  }

  const generator = new MigrationGenerator();
  
  try {
    await generator.createMigrationFiles(migrationName);
  } catch (error) {
    console.error('❌ Migration creation failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = MigrationGenerator;
