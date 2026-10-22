import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initDatabase, checkDbConnection } from './config/db.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

import { notFoundHandler, globalErrorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// CORS Configuration
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:5173', 'http://localhost:3000', 'https://tecnzo.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging & Body Parsers
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Nilan Infra Limited REST API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: {
      connected: checkDbConnection(),
      engine: 'MySQL 8.0'
    }
  });
});

// Public Services API
app.get('/api/services', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 'residential', title: 'Residential Construction', path: '/residential-construction', desc: 'Custom luxury villas, duplex homes, and independent residences in Coimbatore.' },
      { id: 'commercial', title: 'Commercial Construction', path: '/commercial-construction', desc: 'Retail outlets, office hubs, and multi-storey corporate buildings.' },
      { id: 'property', title: 'Property Development', path: '/property-development', desc: 'Turnkey gated communities, layout approvals, and residential plotting.' },
      { id: 'renovation', title: 'Renovation & Remodeling', path: '/renovation-remodeling', desc: 'Structural retrofitting, architectural updates, and space expansion.' },
      { id: 'civil', title: 'Civil Infrastructure', path: '/civil-infrastructure', desc: 'Arterial roads, concrete paving, storm water drainage, and foundation engineering.' }
    ]
  });
});

// Public Testimonials API
app.get('/api/testimonials', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'Dr. A. Senthil Nathan', role: 'Villa Owner, Race Course', quote: 'The construction quality and adherence to timeline by Nilan Infra was outstanding.', rating: 5 },
      { id: 2, name: 'Apex Global Ventures', role: 'Commercial Landmark, Avinashi Road', quote: 'Delivered an architectural masterpiece with utmost structural integrity.', rating: 5 },
      { id: 3, name: 'Mr. & Mrs. Ravichandran', role: 'Heritage Residence, RS Puram', quote: 'Transformed our ancestral home into a modern sanctuary while preserving its legacy.', rating: 5 }
    ]
  });
});

// Mount API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/portfolio', projectRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/quotations', quoteRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 404 & Central Error Handling
app.use(notFoundHandler);
app.use(globalErrorHandler);

// Start Server and Initialize Database
const startServer = async () => {
  // Connect to MySQL and initialize tables
  await initDatabase();

  const server = app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🏗️  NILAN INFRA LIMITED - BACKEND SERVER                ║
║                                                           ║
║   • Status:      ONLINE & OPERATIONAL                     ║
║   • Port:        ${PORT}                                     ║
║   • API URL:     http://localhost:${PORT}/api                ║
║   • Health:      http://localhost:${PORT}/api/health         ║
║   • Database:    ${checkDbConnection() ? 'MySQL 8.0 Connected (LIVE)   ' : 'Offline / Standby Mode      '} ║
║   • Client URL:  ${CLIENT_URL.padEnd(41)}║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
  });

  // Graceful shutdown handling
  const shutdown = () => {
    console.log('\n🛑 Gracefully shutting down Nilan Infra backend server...');
    server.close(() => {
      console.log('Server terminated cleanly.');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

startServer();

export default app;
