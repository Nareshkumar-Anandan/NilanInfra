import { getPool, checkDbConnection } from '../config/db.js';

let mockProjects = [
  { id: 1, project_code: 'PRJ-101', name: 'Skyline Commercial Landmark', category: 'commercial', client: 'Apex Global Ventures', location: 'Avinashi Road, Coimbatore', budget: '₹4.80 Cr', progress: 85, status: 'In Progress', deadline: 'Dec 2025' },
  { id: 2, project_code: 'PRJ-102', name: 'Serene Haven Luxury Villa', category: 'residential', client: 'Dr. A. Senthil Nathan', location: 'Race Course, Coimbatore', budget: '₹1.95 Cr', progress: 100, status: 'Completed', deadline: 'Aug 2025' },
  { id: 3, project_code: 'PRJ-103', name: 'Mayflower Corporate Hub', category: 'commercial', client: 'Mayflower Tech Solutions', location: 'Peelamedu, Coimbatore', budget: '₹6.20 Cr', progress: 45, status: 'In Progress', deadline: 'Apr 2026' },
  { id: 4, project_code: 'PRJ-104', name: 'Green Meadows Gated Community', category: 'residential', client: 'Greenfield Habitats', location: 'Vadavalli, Coimbatore', budget: '₹8.50 Cr', progress: 60, status: 'In Progress', deadline: 'Nov 2026' },
  { id: 5, project_code: 'PRJ-105', name: 'Arasur Industrial Park Access Road', category: 'civil', client: 'SIPCOT Industrial Infra', location: 'Arasur, Coimbatore', budget: '₹3.40 Cr', progress: 92, status: 'In Progress', deadline: 'Jan 2026' },
  { id: 6, project_code: 'PRJ-106', name: 'Heritage Residence Renovation', category: 'renovation', client: 'Mr. & Mrs. Ravichandran', location: 'RS Puram, Coimbatore', budget: '₹65 Lakhs', progress: 100, status: 'Completed', deadline: 'May 2025' }
];

export const getAllProjects = async (req, res, next) => {
  try {
    const { category, status, search } = req.query;

    if (checkDbConnection()) {
      const pool = getPool();
      let query = 'SELECT * FROM projects WHERE 1=1';
      const params = [];

      if (category && category !== 'all') {
        query += ' AND category = ?';
        params.push(category);
      }

      if (status && status !== 'all') {
        query += ' AND status = ?';
        params.push(status);
      }

      if (search) {
        query += ' AND (name LIKE ? OR client LIKE ? OR location LIKE ?)';
        const term = `%${search}%`;
        params.push(term, term, term);
      }

      query += ' ORDER BY id DESC';

      const [rows] = await pool.query(query, params);
      return res.json({ success: true, count: rows.length, data: rows });
    }

    // Memory fallback
    let filtered = [...mockProjects];
    if (category && category !== 'all') filtered = filtered.filter(p => p.category === category);
    if (status && status !== 'all') filtered = filtered.filter(p => p.status === status);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
    }

    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (checkDbConnection()) {
      const pool = getPool();
      const [rows] = await pool.query('SELECT * FROM projects WHERE id = ? OR project_code = ? LIMIT 1', [id, id]);
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.json({ success: true, data: rows[0] });
    }

    const found = mockProjects.find(p => p.id === Number(id) || p.project_code === id);
    if (!found) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: found });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { name, category, client, location, budget, progress = 0, status = 'In Progress', deadline, description, image_url } = req.body;

    if (!name || !budget) {
      return res.status(400).json({ success: false, message: 'Project name and budget are required.' });
    }

    const project_code = `PRJ-${Math.floor(100 + Math.random() * 900)}`;

    if (checkDbConnection()) {
      const pool = getPool();
      const [result] = await pool.query(
        'INSERT INTO projects (project_code, name, category, client, location, budget, progress, status, deadline, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [project_code, name, category || 'residential', client || 'Direct Client', location || 'Coimbatore', budget, Number(progress) || 0, status, deadline || 'TBD', description || null, image_url || null]
      );

      const [newProj] = await pool.query('SELECT * FROM projects WHERE id = ?', [result.insertId]);
      return res.status(201).json({ success: true, message: 'Project created successfully', data: newProj[0] });
    }

    const created = {
      id: mockProjects.length + 1,
      project_code,
      name,
      category: category || 'residential',
      client: client || 'Direct Client',
      location: location || 'Coimbatore',
      budget,
      progress: Number(progress) || 0,
      status,
      deadline: deadline || 'TBD',
      description,
      image_url
    };
    mockProjects.unshift(created);
    res.status(201).json({ success: true, message: 'Project created successfully', data: created });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category, client, location, budget, progress, status, deadline, description, image_url } = req.body;

    if (checkDbConnection()) {
      const pool = getPool();
      const [existing] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
      if (existing.length === 0) {
        return res.status(404).json({ success: false, message: 'Project not found.' });
      }

      await pool.query(
        `UPDATE projects SET 
          name = COALESCE(?, name),
          category = COALESCE(?, category),
          client = COALESCE(?, client),
          location = COALESCE(?, location),
          budget = COALESCE(?, budget),
          progress = COALESCE(?, progress),
          status = COALESCE(?, status),
          deadline = COALESCE(?, deadline),
          description = COALESCE(?, description),
          image_url = COALESCE(?, image_url)
        WHERE id = ?`,
        [name, category, client, location, budget, progress, status, deadline, description, image_url, id]
      );

      const [updated] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
      return res.json({ success: true, message: 'Project updated successfully', data: updated[0] });
    }

    const idx = mockProjects.findIndex(p => p.id === Number(id));
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }
    mockProjects[idx] = { ...mockProjects[idx], ...req.body };
    res.json({ success: true, message: 'Project updated successfully', data: mockProjects[idx] });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (checkDbConnection()) {
      const pool = getPool();
      const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Project not found.' });
      }
      return res.json({ success: true, message: 'Project deleted successfully.' });
    }

    mockProjects = mockProjects.filter(p => p.id !== Number(id));
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
