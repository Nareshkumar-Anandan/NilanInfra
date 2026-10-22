import { getPool, checkDbConnection } from '../config/db.js';

let mockInquiries = [
  { id: 1, inquiry_code: 'INQ-501', name: 'K. Ramachandran', phone: '+91 98422 13450', email: 'k.ramachandran@gmail.com', project_type: 'Residential Construction', message: 'Interested in constructing a 4BHK contemporary villa of 3,800 sq.ft at Race Course.', budget: '₹1.50 Cr', status: 'New', created_at: new Date().toISOString() },
  { id: 2, inquiry_code: 'INQ-502', name: 'Vignesh Sundaram', phone: '+91 94432 99821', email: 'vignesh.sundaram@textech.in', project_type: 'Commercial Construction', message: 'Planning G+4 commercial showroom building with glass facade on Trichy Road.', budget: '₹4.20 Cr', status: 'In Progress', created_at: new Date().toISOString() },
  { id: 3, inquiry_code: 'INQ-503', name: 'Dr. Meenakshi Sundaram', phone: '+91 98941 77234', email: 'drmeenakshi@apollohealth.org', project_type: 'Renovation & Remodeling', message: 'Renovation of 25-year-old ancestral house including structural retrofitting.', budget: '₹45 Lakhs', status: 'Contacted', created_at: new Date().toISOString() },
  { id: 4, inquiry_code: 'INQ-504', name: 'Anandhan Murugesan', phone: '+91 97890 55123', email: 'anand.infra@murugesangroup.com', project_type: 'Civil Infrastructure', message: 'Storm water drainage and concrete pavement contract for logistics park.', budget: '₹1.80 Cr', status: 'Converted', created_at: new Date().toISOString() }
];

export const createInquiry = async (req, res, next) => {
  try {
    const { name, phone, email, project_type, projectType, message, budget } = req.body;

    const actualProjectType = project_type || projectType || 'General Construction';

    if (!name || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, email, and message are required.'
      });
    }

    const inquiry_code = `INQ-${Math.floor(500 + Math.random() * 500)}`;

    if (checkDbConnection()) {
      const pool = getPool();
      const [result] = await pool.query(
        'INSERT INTO inquiries (inquiry_code, name, phone, email, project_type, message, budget, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [inquiry_code, name, phone, email, actualProjectType, message, budget || 'To be estimated', 'New']
      );

      const [newInq] = await pool.query('SELECT * FROM inquiries WHERE id = ?', [result.insertId]);
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your construction inquiry has been submitted to Nilan Infra. Our project engineers will contact you shortly.',
        data: newInq[0]
      });
    }

    const created = {
      id: mockInquiries.length + 1,
      inquiry_code,
      name,
      phone,
      email,
      project_type: actualProjectType,
      message,
      budget: budget || 'To be estimated',
      status: 'New',
      created_at: new Date().toISOString()
    };
    mockInquiries.unshift(created);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your construction inquiry has been submitted to Nilan Infra.',
      data: created
    });
  } catch (error) {
    next(error);
  }
};

export const getAllInquiries = async (req, res, next) => {
  try {
    const { status, search } = req.query;

    if (checkDbConnection()) {
      const pool = getPool();
      let query = 'SELECT * FROM inquiries WHERE 1=1';
      const params = [];

      if (status && status !== 'all') {
        query += ' AND LOWER(status) = LOWER(?)';
        params.push(status);
      }

      if (search) {
        query += ' AND (name LIKE ? OR phone LIKE ? OR email LIKE ? OR project_type LIKE ?)';
        const term = `%${search}%`;
        params.push(term, term, term, term);
      }

      query += ' ORDER BY id DESC';

      const [rows] = await pool.query(query, params);
      return res.json({ success: true, count: rows.length, data: rows });
    }

    let filtered = [...mockInquiries];
    if (status && status !== 'all') {
      filtered = filtered.filter(i => i.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(i => i.name.toLowerCase().includes(q) || i.phone.includes(q) || i.email.toLowerCase().includes(q) || i.project_type.toLowerCase().includes(q));
    }

    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    next(error);
  }
};

export const getInquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (checkDbConnection()) {
      const pool = getPool();
      const [rows] = await pool.query('SELECT * FROM inquiries WHERE id = ? OR inquiry_code = ? LIMIT 1', [id, id]);
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Inquiry not found.' });
      }
      return res.json({ success: true, data: rows[0] });
    }

    const found = mockInquiries.find(i => i.id === Number(id) || i.inquiry_code === id);
    if (!found) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }
    res.json({ success: true, data: found });
  } catch (error) {
    next(error);
  }
};

export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required.' });
    }

    if (checkDbConnection()) {
      const pool = getPool();
      const [result] = await pool.query(
        'UPDATE inquiries SET status = ?, notes = COALESCE(?, notes) WHERE id = ?',
        [status, notes, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Inquiry not found.' });
      }

      const [updated] = await pool.query('SELECT * FROM inquiries WHERE id = ?', [id]);
      return res.json({ success: true, message: `Inquiry status updated to ${status}`, data: updated[0] });
    }

    const idx = mockInquiries.findIndex(i => i.id === Number(id));
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Inquiry not found.' });
    }
    mockInquiries[idx].status = status;
    if (notes) mockInquiries[idx].notes = notes;
    res.json({ success: true, message: `Inquiry status updated to ${status}`, data: mockInquiries[idx] });
  } catch (error) {
    next(error);
  }
};

export const deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (checkDbConnection()) {
      const pool = getPool();
      const [result] = await pool.query('DELETE FROM inquiries WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Inquiry not found.' });
      }
      return res.json({ success: true, message: 'Inquiry removed successfully.' });
    }

    mockInquiries = mockInquiries.filter(i => i.id !== Number(id));
    res.json({ success: true, message: 'Inquiry removed successfully.' });
  } catch (error) {
    next(error);
  }
};
