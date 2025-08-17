# AarogyaCare Healthcare Database Schema

## 📋 Overview

This database schema is designed for a comprehensive healthcare management system that handles patient care, professional management, appointments, payments, and medical records. The schema follows healthcare industry standards and includes enhanced features for modern healthcare applications.

## 🏗️ Database Architecture

### Core Entities
- **Users** - Patient/User management with healthcare-specific fields
- **Healthcare Professionals** - Medical staff (doctors, nurses, specialists, therapists, technicians)
- **Services** - Healthcare services offered by the facility
- **Bookings** - Appointment scheduling and management
- **Payments** - Financial transactions and insurance handling
- **Equipment** - Medical equipment inventory management
- **Equipment Assignments** - Equipment allocation to professionals
- **Credentials** - Professional certifications and licenses
- **Reviews** - Patient feedback and ratings

### Enhanced Healthcare Entities
- **Medical Records** - Patient medical history and diagnoses
- **Prescriptions** - Medication management and tracking
- **Lab Results** - Laboratory test results and analysis
- **Insurance** - Patient insurance information and coverage
- **Audit Logs** - Compliance and security audit trail

## 📁 File Structure

```
database/
├── README.md                    # This documentation
├── migrations/
│   ├── 001_initial_schema.up.sql      # Creates tables and schema
│   ├── 001_initial_schema.down.sql    # Drops tables and schema
│   ├── 002_sample_data.up.sql         # Inserts sample data
│   └── 002_sample_data.down.sql       # Removes sample data
├── migrate.js                         # Migration runner script
└── types/
    └── database.ts             # TypeScript type definitions
```

## 🚀 Quick Start

### 1. Database Setup

```sql
-- Run the initial schema migration
\i database/migrations/001_initial_schema.sql

-- Optional: Add sample data for testing
\i database/migrations/002_sample_data.sql
```

### 2. TypeScript Integration

```typescript
import { 
  User, 
  HealthcareProfessional, 
  Booking, 
  Payment,
  MedicalRecord 
} from '../types/database';

// Use the types in your application
const user: User = {
  user_id: 'uuid',
  full_name: 'John Doe',
  // ... other fields
};
```

## 📊 Entity Relationships

### Core Relationships
```
Users (1) ←→ (N) Bookings
Healthcare Professionals (1) ←→ (N) Bookings
Services (1) ←→ (N) Bookings
Bookings (1) ←→ (1) Payments
Bookings (1) ←→ (N) Reviews
Healthcare Professionals (1) ←→ (N) Credentials
Healthcare Professionals (1) ←→ (N) Equipment Assignments
Equipment (1) ←→ (N) Equipment Assignments
```

### Healthcare Relationships
```
Users (1) ←→ (N) Medical Records
Users (1) ←→ (N) Prescriptions
Users (1) ←→ (N) Lab Results
Users (1) ←→ (1) Insurance
Healthcare Professionals (1) ←→ (N) Medical Records
Healthcare Professionals (1) ←→ (N) Prescriptions
```

## 🔧 Key Features

### 1. **Comprehensive User Management**
- Patient demographics and contact information
- Medical history tracking
- Allergy and medication management
- Emergency contact information
- Insurance integration

### 2. **Professional Management**
- Multi-role support (doctors, nurses, specialists, therapists, technicians)
- Credential verification system
- Availability scheduling
- Department organization
- Experience and education tracking

### 3. **Appointment System**
- Flexible booking management
- Status tracking (pending, confirmed, completed, cancelled, no-show)
- Duration tracking
- Notes and special instructions
- Reminder system integration

### 4. **Payment Processing**
- Multiple payment methods (cash, card, insurance, online, bank transfer)
- Insurance claim integration
- Tax and discount handling
- Receipt generation
- Refund management

### 5. **Medical Records**
- Comprehensive patient history
- Vital signs tracking
- Diagnosis and treatment records
- Lab results integration
- Prescription management
- Follow-up scheduling

### 6. **Equipment Management**
- Inventory tracking
- Maintenance scheduling
- Assignment management
- Cost tracking
- Warranty management

### 7. **Audit and Compliance**
- Complete audit trail
- HIPAA compliance support
- Data change tracking
- User activity monitoring
- Security logging

## 🎨 Enhanced Features

### 1. **Healthcare-Specific Fields**
- Blood type tracking
- Allergy management
- Current medications
- Emergency contact relationships
- Medical history

### 2. **Professional Credentials**
- License verification
- Certification tracking
- Expiration management
- Verification status
- Document storage

### 3. **Insurance Integration**
- Multiple provider support
- Coverage type management
- Deductible and copay tracking
- Network type support
- Dependent management

### 4. **Advanced Booking Features**
- Duration tracking
- Actual vs. scheduled time
- Cancellation management
- Reminder system
- Address overrides

### 5. **Comprehensive Reviews**
- Rating system
- Anonymous reviews
- Professional responses
- Helpful vote tracking
- Report management

## 🔒 Security & Compliance

### 1. **Data Protection**
- UUID primary keys for security
- Encrypted sensitive data support
- Audit trail for all changes
- User activity logging

### 2. **HIPAA Compliance**
- Patient data protection
- Access control
- Audit logging
- Data retention policies

### 3. **Access Control**
- Role-based permissions
- Professional verification
- Credential management
- Session tracking

## 📈 Performance Optimization

### 1. **Indexing Strategy**
- Primary key indexes
- Foreign key indexes
- Search optimization indexes
- Date range indexes
- Status-based indexes

### 2. **Query Optimization**
- Efficient joins
- Pagination support
- Filtering capabilities
- Sorting optimization

### 3. **Data Management**
- Automatic timestamp updates
- Soft delete support
- Data archiving
- Backup strategies

## 🛠️ Development Guidelines

### 1. **TypeScript Integration**
```typescript
// Use the provided types for type safety
import { User, Booking, Payment } from '../types/database';

// Example: Creating a new booking
const newBooking: Omit<Booking, 'booking_id' | 'created_at'> = {
  user_id: 'user-uuid',
  professional_id: 'professional-uuid',
  service_id: 'service-uuid',
  requested_at: new Date(),
  scheduled_at: new Date(),
  status: 'pending',
  // ... other fields
};
```

### 2. **Database Queries**
```sql
-- Example: Get booking with all related data
SELECT 
  b.*,
  u.full_name as patient_name,
  hp.full_name as professional_name,
  s.name as service_name,
  p.amount as payment_amount
FROM bookings b
JOIN users u ON b.user_id = u.user_id
JOIN healthcare_professionals hp ON b.professional_id = hp.professional_id
JOIN services s ON b.service_id = s.service_id
LEFT JOIN payments p ON b.booking_id = p.booking_id
WHERE b.status = 'confirmed';
```

### 3. **Migration Best Practices**
- Always use UUIDs for primary keys
- Include proper foreign key constraints
- Add appropriate indexes
- Use CHECK constraints for data validation
- Include comprehensive comments

## 📋 Sample Data

The `002_sample_data.sql` migration includes comprehensive sample data:

- **5 Healthcare Professionals** (doctors, nurses, specialists, therapists)
- **5 Patients** with complete medical profiles
- **6 Healthcare Services** (consultations, tests, therapy)
- **5 Medical Equipment** items with tracking
- **5 Bookings** with various statuses
- **5 Payments** with different methods
- **4 Reviews** with ratings and comments
- **2 Medical Records** with diagnoses
- **2 Prescriptions** with medication details
- **2 Lab Results** with test data
- **2 Insurance** policies
- **2 Equipment Assignments**
- **2 Audit Logs** for tracking

## 🔄 Migration Process

The database uses a proper migration system with up and down migrations for version control and rollback capabilities.

### Migration Structure

```
database/
├── migrations/
│   ├── 001_initial_schema.up.sql      # Creates tables and schema
│   ├── 001_initial_schema.down.sql    # Drops tables and schema
│   ├── 002_sample_data.up.sql         # Inserts sample data
│   └── 002_sample_data.down.sql       # Removes sample data
├── migrate.js                         # Migration runner script
└── README.md                          # This file
```

### Using the Migration Runner

The project includes a Node.js migration runner that handles:
- ✅ Automatic migration tracking
- ✅ Up and down migrations
- ✅ Transaction safety
- ✅ Migration status tracking
- ✅ Rollback capabilities

#### Prerequisites

Install the PostgreSQL client for Node.js:

```bash
npm install pg
```

#### Migration Commands

```bash
# Show migration status
node database/migrate.js status

# Run all pending up migrations
node database/migrate.js up

# Run all pending down migrations (rollback)
node database/migrate.js down

# Run specific migration up
node database/migrate.js up 001

# Run specific migration down
node database/migrate.js down 001
```

#### Environment Variables

Set these environment variables for database connection:

```bash
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=aarogyacare
export DB_USER=postgres
export DB_PASSWORD=your_password
```

Or create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aarogyacare
DB_USER=postgres
DB_PASSWORD=your_password
```

### Manual Migration Execution

You can also run migrations manually using `psql`:

```bash
# Run initial schema
psql -U postgres -d aarogyacare -f database/migrations/001_initial_schema.up.sql

# Run sample data
psql -U postgres -d aarogyacare -f database/migrations/002_sample_data.up.sql

# Rollback sample data
psql -U postgres -d aarogyacare -f database/migrations/002_sample_data.down.sql

# Rollback schema
psql -U postgres -d aarogyacare -f database/migrations/001_initial_schema.down.sql
```

### Future Migrations

When adding new features, create new migration files:
```sql
-- 003_add_new_feature.up.sql
ALTER TABLE users ADD COLUMN new_field VARCHAR(255);
CREATE INDEX idx_users_new_field ON users(new_field);

-- 003_add_new_feature.down.sql
DROP INDEX IF EXISTS idx_users_new_field;
ALTER TABLE users DROP COLUMN IF EXISTS new_field;
```

## 🧪 Testing

### 1. **Sample Data Testing**
```sql
-- Test user queries
SELECT * FROM users WHERE is_active = true;

-- Test booking relationships
SELECT 
  u.full_name,
  hp.full_name as professional,
  s.name as service,
  b.status
FROM bookings b
JOIN users u ON b.user_id = u.user_id
JOIN healthcare_professionals hp ON b.professional_id = hp.professional_id
JOIN services s ON b.service_id = s.service_id;
```

### 2. **Performance Testing**
```sql
-- Test index performance
EXPLAIN ANALYZE SELECT * FROM bookings WHERE user_id = 'user-uuid';

-- Test complex queries
EXPLAIN ANALYZE 
SELECT 
  hp.full_name,
  COUNT(b.booking_id) as total_bookings,
  AVG(r.rating) as avg_rating
FROM healthcare_professionals hp
LEFT JOIN bookings b ON hp.professional_id = b.professional_id
LEFT JOIN reviews r ON hp.professional_id = r.professional_id
GROUP BY hp.professional_id, hp.full_name;
```

## 📚 Additional Resources

### 1. **Healthcare Standards**
- HL7 FHIR for healthcare data exchange
- HIPAA compliance guidelines
- Medical coding standards (ICD-10, CPT)

### 2. **Database Best Practices**
- PostgreSQL documentation
- UUID generation strategies
- Performance optimization techniques

### 3. **Security Guidelines**
- OWASP security guidelines
- Data encryption standards
- Access control best practices

## 🤝 Contributing

When contributing to the database schema:

1. **Follow Naming Conventions**
   - Use snake_case for table and column names
   - Use descriptive names
   - Include proper comments

2. **Maintain Data Integrity**
   - Add appropriate constraints
   - Include foreign key relationships
   - Validate data types

3. **Performance Considerations**
   - Add necessary indexes
   - Optimize query patterns
   - Consider data volume

4. **Documentation**
   - Update this README
   - Include migration comments
   - Document new features

## 📞 Support

For questions or issues with the database schema:

- Review the TypeScript types in `src/types/database.ts`
- Check the migration files for examples
- Refer to PostgreSQL documentation
- Contact the development team

---

**AarogyaCare Healthcare Database Schema** - Designed for modern healthcare applications with comprehensive patient care, professional management, and compliance features.
