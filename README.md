# AarogyaCare - Healthcare Management System

A comprehensive React Native mobile application built with Expo for healthcare service management, featuring patient care, professional management, appointments, and medical records. Includes dark/light mode and multi-language support (English, Finnish, and Nepali).

## Features

### 🏥 **Healthcare Management**
- **Patient Management**: Complete patient profiles with medical history, allergies, and insurance
- **Professional Management**: Healthcare staff (doctors, nurses, specialists) with credentials
- **Appointment System**: Booking management with status tracking and reminders
- **Medical Records**: Comprehensive patient medical history and diagnoses
- **Payment Processing**: Multiple payment methods with insurance integration
- **Equipment Management**: Medical equipment inventory and assignment tracking

### 🎨 **User Experience**
- 🌙 **Dark/Light Mode**: Toggle between dark and light themes with persistent storage
- 🌍 **Multi-language Support**: Switch between English, Finnish, and Nepali languages
- 🎨 **Modern UI**: Built with Tailwind CSS (NativeWind) for beautiful, responsive design
- 📱 **Cross-platform**: Works on both iOS and Android
- ⚡ **Fast Development**: Built with Expo for rapid development and easy deployment

### 🗄️ **Database & Backend**
- **PostgreSQL Database**: Robust healthcare data management
- **Migration System**: Version-controlled database schema management
- **TypeScript Types**: Full type safety for database entities
- **Sample Data**: Comprehensive test data for development

## Tech Stack

### **Frontend**
- **React Native** with **Expo**
- **TypeScript** for type safety
- **NativeWind** (Tailwind CSS for React Native)
- **AsyncStorage** for persistent data storage
- **React Context** for state management
- **React Navigation** for app navigation

### **Backend & Database**
- **PostgreSQL** for data persistence
- **Node.js** for migration scripts
- **pg** (PostgreSQL client for Node.js)
- **UUID** for secure primary keys
- **JSONB** for flexible data storage

### **Development Tools**
- **Expo CLI** for development and deployment
- **Tailwind CSS** for styling
- **i18next** for internationalization

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- PostgreSQL (v12 or higher)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AarogyaCare
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Create PostgreSQL database
   createdb aarogyacare
   
   # Set up environment variables (create .env file)
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Run database migrations**
   ```bash
   npm run db:migrate:up
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Run on your preferred platform**
   ```bash
   # For iOS (requires macOS)
   npm run ios
   
   # For Android
   npm run android
   
   # For web
   npm run web
   ```

## Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/           # React Context providers
│   │   ├── ThemeContext.tsx
│   │   ├── LanguageContext.tsx
│   │   └── UserContext.tsx
│   ├── locales/            # Translation files
│   │   ├── en.json
│   │   ├── fi.json
│   │   └── ne.json
│   ├── navigation/         # Navigation configuration
│   ├── screens/            # App screens
│   ├── services/           # API and utility services
│   ├── types/              # TypeScript type definitions
│   │   └── database.ts     # Database entity types
│   └── utils/              # Utility functions
├── database/
│   ├── migrations/         # Database migration files
│   │   ├── 001_initial_schema.up.sql
│   │   ├── 001_initial_schema.down.sql
│   │   ├── 002_sample_data.up.sql
│   │   └── 002_sample_data.down.sql
│   ├── config.js           # Database configuration
│   ├── migrate.js          # Migration runner
│   ├── create-migration.js # Migration generator
│   └── README.md           # Database documentation
├── assets/                 # App assets and images
└── package.json           # Project dependencies and scripts
```

## Features in Detail

### 🏥 Healthcare Management
- **Patient Management**: Complete patient profiles with medical history, allergies, and insurance information
- **Professional Management**: Healthcare staff management with credential verification
- **Appointment System**: Booking management with status tracking and reminder system
- **Medical Records**: Comprehensive patient medical history and diagnosis tracking
- **Payment Processing**: Multiple payment methods with insurance integration
- **Equipment Management**: Medical equipment inventory and assignment tracking

### 🎨 Theme Management
- Automatic theme persistence using AsyncStorage
- Smooth transitions between light and dark modes
- Theme-aware components that adapt to the current theme

### 🌍 Language Support
- Support for English (en), Finnish (fi), and Nepali (ne)
- Persistent language selection
- Easy to add more languages by extending the translation files

### 🎨 UI Components
- Modern, responsive design using Tailwind CSS
- Consistent theming across all components
- Touch-friendly interface optimized for mobile

## 🗄️ Database Management

### Database Setup

The application uses PostgreSQL for data persistence. The database includes comprehensive healthcare management features with proper relationships and constraints.

#### **Available Scripts**

| Script | Description |
|--------|-------------|
| `npm run db:migrate` | Show migration help |
| `npm run db:migrate:up` | Run all migrations (fresh start) |
| `npm run db:migrate:down` | Rollback all migrations |
| `npm run db:migrate:status` | Show migration status |
| `npm run db:create-migration` | Create new migration files |

#### **Environment Configuration**

Create a `.env` file in the project root:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aarogyacare
DB_USER=postgres
DB_PASSWORD=your_password

# App Configuration
EXPO_PUBLIC_APP_NAME=AarogyaCare
EXPO_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=development
```

### Database CLI Usage

#### **Connect to Database**
```bash
psql -U postgres -d aarogyacare
# Enter password when prompted
```

#### **Essential PostgreSQL Commands**

```sql
-- List all tables
\d

-- Describe specific table
\d users
\d healthcare_professionals
\d bookings

-- View data
SELECT * FROM users;
SELECT * FROM healthcare_professionals;
SELECT * FROM bookings;

-- Complex queries
SELECT 
  u.full_name as patient,
  hp.full_name as professional,
  s.name as service,
  b.status,
  b.scheduled_at
FROM bookings b
JOIN users u ON b.user_id = u.user_id
JOIN healthcare_professionals hp ON b.professional_id = hp.professional_id
JOIN services s ON b.service_id = s.service_id;

-- Count records
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM bookings WHERE status = 'confirmed';
```

#### **Database Maintenance**

```sql
-- Analyze table statistics
ANALYZE users;
ANALYZE bookings;

-- Show database size
SELECT pg_size_pretty(pg_database_size('aarogyacare'));

-- Show table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

#### **Export/Import Data**

```bash
# Export table to CSV
psql -U postgres -d aarogyacare -c "\COPY users TO 'users.csv' CSV HEADER"

# Import CSV to table
psql -U postgres -d aarogyacare -c "\COPY users FROM 'new_users.csv' CSV HEADER"
```

### Creating New Migrations

```bash
# Create a new migration
npm run db:create-migration add_user_profile_fields

# This creates:
# - 003_add_user_profile_fields.up.sql
# - 003_add_user_profile_fields.down.sql
```

#### **Migration Naming Conventions**
- Use snake_case
- Be descriptive but concise
- Start with action (add, create, update, remove, etc.)
- Include table/field names

Examples:
- `add_user_profile_fields`
- `create_notifications_table`
- `update_booking_status_enum`
- `add_index_to_users_email`

### Development Mode

The migration system is configured for development with automatic database cleanup:
- **Always starts fresh** - Drops all tables before running migrations
- **Perfect for development** - Clean slate every time
- **No manual cleanup needed** - Automated table dropping

## 🌍 Adding New Languages

To add a new language:

1. Create a new translation file in `src/locales/` (e.g., `de.json`)
2. Add the language to the `Language` type in `src/types/index.ts`
3. Update the language selector in the app

## 🛠️ Troubleshooting

### Database Connection Issues

**Error: "Failed to connect to database"**
```bash
# Check if PostgreSQL is running
# Windows:
Get-Service postgresql*

# macOS/Linux:
sudo systemctl status postgresql

# Ensure database exists
createdb aarogyacare

# Check credentials in .env file
cat .env
```

**Error: "psql command not found"**
```bash
# Add PostgreSQL to PATH (Windows)
$env:PATH += ";C:\Program Files\PostgreSQL\17\bin"

# Or install PostgreSQL client
# Windows: Download from postgresql.org
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql-client
```

### Migration Issues

**Error: "relation already exists"**
```bash
# Run migrations (automatically cleans database)
npm run db:migrate:up
```

**Error: "migration table not found"**
```bash
# Recreate migration table
npm run db:migrate:status
```

### App Development Issues

**Metro bundler issues**
```bash
# Clear cache
npx expo start --clear

# Reset cache
npx expo start -c
```

**TypeScript errors**
```bash
# Check types
npx tsc --noEmit

# Install missing types
npm install @types/react @types/react-native
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Set up the development environment:
   ```bash
   npm install
   createdb aarogyacare
   npm run db:migrate:up
   ```
4. Make your changes
5. Test your changes:
   ```bash
   npm run db:migrate:up  # Ensure database is fresh
   npm start              # Test the app
   ```
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Guidelines

- **Database Changes**: Always create migrations for schema changes
- **TypeScript**: Maintain type safety throughout the codebase
- **Testing**: Test database migrations and app functionality
- **Documentation**: Update README for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Getting Help

- **Documentation**: Check the `database/README.md` for detailed database documentation
- **Issues**: Create an issue in the repository for bugs or feature requests
- **Email**: support@aarogyacare.com for general inquiries

### Community

- **Discussions**: Use GitHub Discussions for questions and ideas
- **Wiki**: Check the project wiki for additional resources
- **Examples**: See the sample data and migration files for reference

---

**AarogyaCare** - Empowering healthcare with modern technology 🏥✨
