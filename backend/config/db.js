import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const {
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'nilan_infra_db',
  ADMIN_EMAIL = 'nilan.infralimited@gmail.com',
  ADMIN_PASSWORD = 'Nilan@321'
} = process.env;

let pool = null;
let isConnected = false;

// Create MySQL Connection Pool
export const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    });
  }
  return pool;
};

// Initialize Database & Run Automatic Migration / Seeds
export const initDatabase = async () => {
  try {
    // 1. Connect without database to ensure database exists
    const rootConnection = await mysql.createConnection({
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASSWORD
    });

    await rootConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    await rootConnection.end();

    // 2. Obtain connection to the newly ensured database
    const dbPool = getPool();
    const conn = await dbPool.getConnection();

    // 3. Create Admins Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS \`admins\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`email\` VARCHAR(191) NOT NULL UNIQUE,
        \`password_hash\` VARCHAR(255) NOT NULL,
        \`name\` VARCHAR(150) NOT NULL DEFAULT 'Nilan Administrator',
        \`role\` VARCHAR(50) NOT NULL DEFAULT 'Super Administrator',
        \`department\` VARCHAR(100) DEFAULT 'Executive Management & Infrastructure',
        \`avatar\` VARCHAR(10) DEFAULT 'NI',
        \`last_login\` DATETIME NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Create Projects Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS \`projects\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`project_code\` VARCHAR(50) NOT NULL UNIQUE,
        \`name\` VARCHAR(200) NOT NULL,
        \`category\` ENUM('residential', 'commercial', 'civil', 'renovation') NOT NULL DEFAULT 'residential',
        \`client\` VARCHAR(150) NOT NULL,
        \`location\` VARCHAR(255) NOT NULL,
        \`budget\` VARCHAR(50) NOT NULL,
        \`progress\` INT NOT NULL DEFAULT 0,
        \`status\` ENUM('Planning', 'In Progress', 'Completed', 'Under Review') NOT NULL DEFAULT 'In Progress',
        \`deadline\` VARCHAR(50) DEFAULT NULL,
        \`image_url\` VARCHAR(500) DEFAULT NULL,
        \`description\` TEXT DEFAULT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Create Inquiries & Leads Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS \`inquiries\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`inquiry_code\` VARCHAR(50) NOT NULL UNIQUE,
        \`name\` VARCHAR(150) NOT NULL,
        \`phone\` VARCHAR(50) NOT NULL,
        \`email\` VARCHAR(191) NOT NULL,
        \`project_type\` VARCHAR(100) NOT NULL,
        \`message\` TEXT NOT NULL,
        \`budget\` VARCHAR(100) DEFAULT 'To be estimated',
        \`status\` ENUM('New', 'In Progress', 'Contacted', 'Converted', 'Closed') NOT NULL DEFAULT 'New',
        \`notes\` TEXT DEFAULT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 6. Create Quotations Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS \`quotations\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`quote_ref\` VARCHAR(50) NOT NULL UNIQUE,
        \`client_name\` VARCHAR(150) NOT NULL,
        \`phone\` VARCHAR(50) NOT NULL,
        \`email\` VARCHAR(191) NOT NULL,
        \`location\` VARCHAR(255) NOT NULL,
        \`project_type\` VARCHAR(100) NOT NULL,
        \`builtup_sqft\` INT NOT NULL,
        \`floors\` VARCHAR(50) NOT NULL,
        \`spec_grade\` ENUM('Standard', 'Premium', 'Ultra-Luxury') NOT NULL DEFAULT 'Premium',
        \`rate_per_sqft\` DECIMAL(10, 2) NOT NULL,
        \`total_estimate\` DECIMAL(14, 2) NOT NULL,
        \`breakdown_json\` JSON DEFAULT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 7. Create Blogs Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS \`blogs\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`title\` VARCHAR(255) NOT NULL,
        \`slug\` VARCHAR(255) NOT NULL UNIQUE,
        \`category\` VARCHAR(100) NOT NULL,
        \`excerpt\` TEXT DEFAULT NULL,
        \`content\` LONGTEXT DEFAULT NULL,
        \`cover_image\` VARCHAR(500) DEFAULT NULL,
        \`status\` ENUM('Draft', 'Published') NOT NULL DEFAULT 'Published',
        \`views_count\` INT NOT NULL DEFAULT 0,
        \`published_at\` DATE DEFAULT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 8. Seed Default Admin if not exists
    const [existingAdmins] = await conn.query('SELECT id FROM admins WHERE email = ?', [ADMIN_EMAIL]);
    if (existingAdmins.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(ADMIN_PASSWORD, salt);
      await conn.query(
        'INSERT INTO admins (email, password_hash, name, role) VALUES (?, ?, ?, ?)',
        [ADMIN_EMAIL, hash, 'Nilan Administrator', 'Super Administrator']
      );
      console.log(`✅ Default admin account seeded: ${ADMIN_EMAIL}`);
    }

    // 9. Seed Projects if empty
    const [existingProjects] = await conn.query('SELECT COUNT(*) as count FROM projects');
    if (existingProjects[0].count === 0) {
      const sampleProjects = [
        ['PRJ-101', 'Skyline Commercial Landmark', 'commercial', 'Apex Global Ventures', 'Avinashi Road, Coimbatore', '₹4.80 Cr', 85, 'In Progress', 'Dec 2025', 'Modern multi-storey retail and corporate hub.'],
        ['PRJ-102', 'Serene Haven Luxury Villa', 'residential', 'Dr. A. Senthil Nathan', 'Race Course, Coimbatore', '₹1.95 Cr', 100, 'Completed', 'Aug 2025', 'Ultra-luxurious custom architectural villa.'],
        ['PRJ-103', 'Mayflower Corporate Hub', 'commercial', 'Mayflower Tech Solutions', 'Peelamedu, Coimbatore', '₹6.20 Cr', 45, 'In Progress', 'Apr 2026', 'State of the art IT park corporate building.'],
        ['PRJ-104', 'Green Meadows Gated Community', 'residential', 'Greenfield Habitats', 'Vadavalli, Coimbatore', '₹8.50 Cr', 60, 'In Progress', 'Nov 2026', 'Premium residential township of 24 independent villas.'],
        ['PRJ-105', 'Arasur Industrial Park Access Road', 'civil', 'SIPCOT Industrial Infra', 'Arasur, Coimbatore', '₹3.40 Cr', 92, 'In Progress', 'Jan 2026', 'High-load heavy vehicular 4-lane concrete arterial road.'],
        ['PRJ-106', 'Heritage Residence Renovation', 'renovation', 'Mr. & Mrs. Ravichandran', 'RS Puram, Coimbatore', '₹65 Lakhs', 100, 'Completed', 'May 2025', 'Complete structural reinforcement and modernization.']
      ];

      for (const p of sampleProjects) {
        await conn.query(
          'INSERT INTO projects (project_code, name, category, client, location, budget, progress, status, deadline, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          p
        );
      }
      console.log('✅ Seeded default infrastructure projects.');
    }

    // 10. Seed Inquiries if empty
    const [existingInquiries] = await conn.query('SELECT COUNT(*) as count FROM inquiries');
    if (existingInquiries[0].count === 0) {
      const sampleInquiries = [
        ['INQ-501', 'K. Ramachandran', '+91 98422 13450', 'k.ramachandran@gmail.com', 'Residential Construction', 'Interested in constructing a 4BHK contemporary villa of 3,800 sq.ft at Race Course.', '₹1.50 Cr', 'New'],
        ['INQ-502', 'Vignesh Sundaram', '+91 94432 99821', 'vignesh.sundaram@textech.in', 'Commercial Construction', 'Planning G+4 commercial showroom building with glass facade on Trichy Road.', '₹4.20 Cr', 'In Progress'],
        ['INQ-503', 'Dr. Meenakshi Sundaram', '+91 98941 77234', 'drmeenakshi@apollohealth.org', 'Renovation & Remodeling', 'Renovation of 25-year-old ancestral house including structural retrofitting.', '₹45 Lakhs', 'Contacted'],
        ['INQ-504', 'Anandhan Murugesan', '+91 97890 55123', 'anand.infra@murugesangroup.com', 'Civil Infrastructure', 'Storm water drainage and concrete pavement contract for logistics park.', '₹1.80 Cr', 'Converted']
      ];

      for (const inq of sampleInquiries) {
        await conn.query(
          'INSERT INTO inquiries (inquiry_code, name, phone, email, project_type, message, budget, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          inq
        );
      }
      console.log('✅ Seeded default inquiries & CRM leads.');
    }

    conn.release();
    isConnected = true;
    console.log(`📦 Connected to MySQL database "${DB_NAME}" successfully.`);
    return true;
  } catch (error) {
    isConnected = false;
    console.error('\n⚠️  MySQL Connection / Initialization Notice:');
    console.error(`   ${error.message}`);
    console.error('   Please check that your MySQL service is running and configure DB_PASSWORD in backend/.env');
    console.error('   Default user: root | Database: nilan_infra_db\n');
    return false;
  }
};

export const checkDbConnection = () => isConnected;

export default {
  getPool,
  initDatabase,
  checkDbConnection
};
