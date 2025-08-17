# AarogyaCare Backend Server

Express.js backend API server for the AarogyaCare healthcare management system.

## Features

- **RESTful API** - Complete CRUD operations for healthcare entities
- **PostgreSQL Integration** - Robust database with proper relationships
- **Input Validation** - Comprehensive request validation using express-validator
- **Error Handling** - Centralized error handling with proper HTTP status codes
- **Security** - Helmet.js for security headers, CORS configuration
- **Logging** - Request logging with Morgan
- **Compression** - Response compression for better performance

## Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Setup

Create a `.env` file in the server directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aarogyacare
DB_USER=postgres
DB_PASSWORD=admin

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:8081

# JWT Configuration (for future authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d

# API Configuration
API_VERSION=v1
```

### 3. Database Setup

Make sure PostgreSQL is running and the database is set up:

```bash
# From the project root
npm run db:migrate:up
```

### 4. Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Users
- `GET /api/users` - Get all users (with pagination)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/medical-records` - Get user's medical records
- `GET /api/users/:id/bookings` - Get user's bookings

### Other Endpoints (Coming Soon)
- `/api/professionals` - Healthcare professionals
- `/api/bookings` - Appointments and bookings
- `/api/medical-records` - Medical records
- `/api/payments` - Payment processing
- `/api/services` - Healthcare services

## API Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": {...},
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message",
  "details": [...]
}
```

## Development

### Project Structure

```
server/
├── config/
│   └── database.js          # Database configuration
├── middleware/
│   ├── errorHandler.js      # Error handling middleware
│   └── notFound.js          # 404 handler
├── routes/
│   ├── users.js             # User routes
│   ├── professionals.js     # Professional routes
│   ├── bookings.js          # Booking routes
│   ├── medicalRecords.js    # Medical record routes
│   ├── payments.js          # Payment routes
│   └── services.js          # Service routes
├── index.js                 # Main server file
├── package.json             # Dependencies
└── README.md               # This file
```

### Adding New Routes

1. Create a new route file in `routes/`
2. Import and add to `index.js`
3. Follow the existing pattern for validation and error handling

### Database Queries

Use the `query` function from `config/database.js`:

```javascript
const { query } = require('../config/database');

const result = await query('SELECT * FROM users WHERE id = $1', [userId]);
```

## Testing

```bash
npm test
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a proper JWT secret
3. Configure database connection for production
4. Set up proper CORS origins
5. Use a process manager like PM2

## Security Considerations

- All inputs are validated using express-validator
- SQL injection protection through parameterized queries
- CORS configured for specific origins
- Security headers with Helmet.js
- Error messages don't expose sensitive information in production

## Troubleshooting

### Database Connection Issues
- Check PostgreSQL is running
- Verify database credentials in `.env`
- Ensure database exists: `createdb aarogyacare`

### Port Already in Use
- Change PORT in `.env` file
- Kill existing process: `lsof -ti:3000 | xargs kill -9`

### CORS Issues
- Check FRONTEND_URL in `.env`
- Verify frontend is running on the correct port
