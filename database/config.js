/**
 * Database Configuration for AarogyaCare
 * 
 * Set your database credentials here or use environment variables
 */

// Database configuration
const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'aarogyacare',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'admin', // ⚠️ Replace with your actual password
};

module.exports = { DB_CONFIG };
