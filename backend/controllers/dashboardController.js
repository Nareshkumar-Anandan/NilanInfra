import { getPool, checkDbConnection } from '../config/db.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    if (checkDbConnection()) {
      const pool = getPool();

      // Projects stats
      const [projectCounts] = await pool.query(`
        SELECT 
          COUNT(*) as total_projects,
          SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as ongoing_projects,
          SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed_projects
        FROM projects
      `);

      // Inquiries stats
      const [inquiryCounts] = await pool.query(`
        SELECT 
          COUNT(*) as total_inquiries,
          SUM(CASE WHEN status = 'New' THEN 1 ELSE 0 END) as new_inquiries,
          SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as in_progress_inquiries,
          SUM(CASE WHEN status = 'Converted' THEN 1 ELSE 0 END) as converted_inquiries
        FROM inquiries
      `);

      // Quotations count
      const [quoteCounts] = await pool.query('SELECT COUNT(*) as total_quotes FROM quotations');

      // Recent 5 projects
      const [recentProjects] = await pool.query('SELECT * FROM projects ORDER BY id DESC LIMIT 5');

      // Recent 5 inquiries
      const [recentInquiries] = await pool.query('SELECT * FROM inquiries ORDER BY id DESC LIMIT 5');

      return res.json({
        success: true,
        database: {
          connected: true,
          engine: 'MySQL 8.0'
        },
        stats: {
          projects: {
            total: projectCounts[0].total_projects || 0,
            ongoing: projectCounts[0].ongoing_projects || 0,
            completed: projectCounts[0].completed_projects || 0
          },
          inquiries: {
            total: inquiryCounts[0].total_inquiries || 0,
            new: inquiryCounts[0].new_inquiries || 0,
            in_progress: inquiryCounts[0].in_progress_inquiries || 0,
            converted: inquiryCounts[0].converted_inquiries || 0
          },
          quotations: {
            total: quoteCounts[0].total_quotes || 0
          },
          portfolio: {
            contract_value: '₹24.85 Cr',
            compliance_score: '99.4%'
          }
        },
        recentProjects,
        recentInquiries
      });
    }

    // Offline / fallback statistics
    res.json({
      success: true,
      database: {
        connected: false,
        note: 'Configure MySQL credentials in backend/.env to persist live records in MySQL'
      },
      stats: {
        projects: { total: 6, ongoing: 4, completed: 2 },
        inquiries: { total: 4, new: 1, in_progress: 1, converted: 1 },
        quotations: { total: 0 },
        portfolio: { contract_value: '₹24.85 Cr', compliance_score: '99.4%' }
      }
    });
  } catch (error) {
    next(error);
  }
};
