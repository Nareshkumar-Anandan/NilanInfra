-- =========================================================
-- NILAN INFRA LIMITED - DATABASE SCHEMA & SEED DATA
-- MySQL 8.0+ Compatibility
-- =========================================================

CREATE DATABASE IF NOT EXISTS `nilan_infra_db` 
DEFAULT CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `nilan_infra_db`;

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `name` VARCHAR(150) NOT NULL DEFAULT 'Nilan Administrator',
  `role` VARCHAR(50) NOT NULL DEFAULT 'Super Administrator',
  `department` VARCHAR(100) DEFAULT 'Executive Management & Infrastructure',
  `avatar` VARCHAR(10) DEFAULT 'NI',
  `last_login` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `project_code` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(200) NOT NULL,
  `category` ENUM('residential', 'commercial', 'civil', 'renovation') NOT NULL DEFAULT 'residential',
  `client` VARCHAR(150) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `budget` VARCHAR(50) NOT NULL,
  `progress` INT NOT NULL DEFAULT 0,
  `status` ENUM('Planning', 'In Progress', 'Completed', 'Under Review') NOT NULL DEFAULT 'In Progress',
  `deadline` VARCHAR(50) DEFAULT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Inquiries & CRM Leads Table
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `inquiry_code` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `project_type` VARCHAR(100) NOT NULL,
  `message` TEXT NOT NULL,
  `budget` VARCHAR(100) DEFAULT 'To be estimated',
  `status` ENUM('New', 'In Progress', 'Contacted', 'Converted', 'Closed') NOT NULL DEFAULT 'New',
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Quotations & Cost Estimations Table
CREATE TABLE IF NOT EXISTS `quotations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `quote_ref` VARCHAR(50) NOT NULL UNIQUE,
  `client_name` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `project_type` VARCHAR(100) NOT NULL,
  `builtup_sqft` INT NOT NULL,
  `floors` VARCHAR(50) NOT NULL,
  `spec_grade` ENUM('Standard', 'Premium', 'Ultra-Luxury') NOT NULL DEFAULT 'Premium',
  `rate_per_sqft` DECIMAL(10, 2) NOT NULL,
  `total_estimate` DECIMAL(14, 2) NOT NULL,
  `breakdown_json` JSON DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Blogs & Editorial Hub Table
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `category` VARCHAR(100) NOT NULL,
  `excerpt` TEXT DEFAULT NULL,
  `content` LONGTEXT DEFAULT NULL,
  `cover_image` VARCHAR(500) DEFAULT NULL,
  `status` ENUM('Draft', 'Published') NOT NULL DEFAULT 'Published',
  `views_count` INT NOT NULL DEFAULT 0,
  `published_at` DATE DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- INITIAL SEED DATA
-- =========================================================

-- Seed Default Admin: nilan.infralimited@gmail.com / Nilan@321
-- Password hash generated with bcryptjs for 'Nilan@321'
INSERT INTO `admins` (`email`, `password_hash`, `name`, `role`, `department`, `avatar`)
VALUES (
  'nilan.infralimited@gmail.com',
  '$2a$10$wNqA0v1r2235B4Q8LomXve6wGq0yVnfgxP1nU0yS7J6X6LzJpXN7e',
  'Nilan Administrator',
  'Super Administrator',
  'Executive Management & Infrastructure',
  'NI'
) ON DUPLICATE KEY UPDATE `email` = `email`;

-- Seed Sample Infrastructure Projects
INSERT INTO `projects` (`project_code`, `name`, `category`, `client`, `location`, `budget`, `progress`, `status`, `deadline`, `description`)
VALUES 
('PRJ-101', 'Skyline Commercial Landmark', 'commercial', 'Apex Global Ventures', 'Avinashi Road, Coimbatore', '₹4.80 Cr', 85, 'In Progress', 'Dec 2025', 'Modern multi-storey retail and corporate hub built with energy-efficient glass facade and seismic-compliant concrete.'),
('PRJ-102', 'Serene Haven Luxury Villa', 'residential', 'Dr. A. Senthil Nathan', 'Race Course, Coimbatore', '₹1.95 Cr', 100, 'Completed', 'Aug 2025', 'Ultra-luxurious custom architectural villa with private landscaped courtyard and Italian marble finishing.'),
('PRJ-103', 'Mayflower Corporate Hub', 'commercial', 'Mayflower Tech Solutions', 'Peelamedu, Coimbatore', '₹6.20 Cr', 45, 'In Progress', 'Apr 2026', 'State of the art IT park corporate building with dual basement parking and high-performance HVAC systems.'),
('PRJ-104', 'Green Meadows Gated Community', 'residential', 'Greenfield Habitats', 'Vadavalli, Coimbatore', '₹8.50 Cr', 60, 'In Progress', 'Nov 2026', 'Premium residential township consisting of 24 independent villas with underground drainage and paved boulevards.'),
('PRJ-105', 'Arasur Industrial Park Access Road', 'civil', 'SIPCOT Industrial Infra', 'Arasur, Coimbatore', '₹3.40 Cr', 92, 'In Progress', 'Jan 2026', 'High-load heavy vehicular 4-lane concrete arterial road connecting national highway with industrial warehousing park.'),
('PRJ-106', 'Heritage Residence Renovation', 'renovation', 'Mr. & Mrs. Ravichandran', 'RS Puram, Coimbatore', '₹65 Lakhs', 100, 'Completed', 'May 2025', 'Complete structural reinforcement, roof waterproofing and architectural modern makeover for 30-year-old residence.')
ON DUPLICATE KEY UPDATE `project_code` = `project_code`;

-- Seed Sample Inquiries & CRM Leads
INSERT INTO `inquiries` (`inquiry_code`, `name`, `phone`, `email`, `project_type`, `message`, `budget`, `status`)
VALUES
('INQ-501', 'K. Ramachandran', '+91 98422 13450', 'k.ramachandran@gmail.com', 'Residential Construction', 'Interested in constructing a 4BHK contemporary villa of 3,800 sq.ft at Race Course. Seeking quote and architectural design discussion.', '₹1.50 Cr', 'New'),
('INQ-502', 'Vignesh Sundaram', '+91 94432 99821', 'vignesh.sundaram@textech.in', 'Commercial Construction', 'Planning G+4 commercial showroom building with glass facade and basement parking on Trichy Road.', '₹4.20 Cr', 'In Progress'),
('INQ-503', 'Dr. Meenakshi Sundaram', '+91 98941 77234', 'drmeenakshi@apollohealth.org', 'Renovation & Remodeling', 'Renovation of 25-year-old ancestral house including structural retrofitting and modern interior layout redesign.', '₹45 Lakhs', 'Contacted'),
('INQ-504', 'Anandhan Murugesan', '+91 97890 55123', 'anand.infra@murugesangroup.com', 'Civil Infrastructure', 'Storm water drainage and concrete pavement contract for private logistics park near Eachanari.', '₹1.80 Cr', 'Converted')
ON DUPLICATE KEY UPDATE `inquiry_code` = `inquiry_code`;

-- Seed Sample Editorial Blogs
INSERT INTO `blogs` (`title`, `slug`, `category`, `excerpt`, `status`, `views_count`, `published_at`)
VALUES
('Top 7 Construction Trends Transforming Coimbatore in 2025', 'top-7-construction-trends-coimbatore-2025', 'Architecture & Tech', 'Explore sustainable materials, precast columns, and Vastu-compliant smart layouts popular in Western Tamil Nadu.', 'Published', 1420, '2026-10-12'),
('Why High-Grade Fe 550D TMT Steel is Critical for Earthquake Resilience', 'why-fe-550d-tmt-steel-earthquake-resilience', 'Engineering', 'A comprehensive technical breakdown on steel grades, ductility ratios, and elongation properties.', 'Published', 980, '2026-10-04'),
('Cost Estimation Guide: Building Your Dream Villa in Coimbatore', 'cost-estimation-guide-building-villa-coimbatore', 'Planning & Finance', 'Step by step sq.ft rate breakdown covering foundation, structural masonry, MEP, and luxury finishing joinery.', 'Published', 2890, '2026-09-28')
ON DUPLICATE KEY UPDATE `slug` = `slug`;
