/**
 * Generate Password Hash Script
 * 
 * This script generates the correct bcrypt hash for the default password
 */

const bcrypt = require('bcryptjs');

const DEFAULT_PASSWORD = 'AarogyaCare2024!';
const SALT_ROUNDS = 12;

async function generateHash() {
  try {
    console.log('Generating bcrypt hash...');
    console.log(`Password: ${DEFAULT_PASSWORD}`);
    console.log(`Salt rounds: ${SALT_ROUNDS}`);
    
    const hash = await bcrypt.hash(DEFAULT_PASSWORD, SALT_ROUNDS);
    
    console.log('\n✅ Generated hash:');
    console.log(hash);
    
    // Verify the hash works
    const isValid = await bcrypt.compare(DEFAULT_PASSWORD, hash);
    console.log(`\n✅ Hash verification: ${isValid ? 'PASSED' : 'FAILED'}`);
    
    return hash;
  } catch (error) {
    console.error('Error generating hash:', error);
    process.exit(1);
  }
}

// Run the script
generateHash();
