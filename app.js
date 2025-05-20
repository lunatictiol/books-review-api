// Import required dependencies and modules
import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join,dirname } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';

// Import route handlers
import indexRouter from './routes/index.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

// Import additional middleware and configuration
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Load environment variables and initialize database connection
dotenv.config();
connectDB()

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express application
var app = express();

// Configure view engine settings
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set up middleware stack
app.use(logger('dev'));                          // HTTP request logging
app.use(json());                                 // Parse JSON request bodies
app.use(urlencoded({ extended: false }));        // Parse URL-encoded bodies
app.use(cookieParser());                         // Parse cookies
app.use(express.static(join(__dirname, 'public'))); // Serve static files
app.use(cors());                                 // Enable Cross-Origin Resource Sharing

// Register API routes
app.use('/', indexRouter);                       // Main page routes
app.use('/api/auth', authRoutes);                // Authentication routes
app.use('/api', bookRoutes);                     // Book management routes
app.use('/api', reviewRoutes);                   // Review management routes

// Error Handling

// Handle 404 errors - Forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Global error handler
app.use(function(err, req, res, next) {
  // Set locals for error information
  // Only expose detailed errors in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render error page with appropriate status code
  res.status(err.status || 500);
  res.render('error');
});

export default app;
