import { getPool, checkDbConnection } from '../config/db.js';

let mockBlogs = [
  { id: 1, title: 'Top 7 Construction Trends Transforming Coimbatore in 2025', slug: 'top-7-construction-trends-coimbatore-2025', category: 'Architecture & Tech', excerpt: 'Explore sustainable materials, precast columns, and Vastu-compliant smart layouts.', status: 'Published', views_count: 1420, published_at: '2026-10-12' },
  { id: 2, title: 'Why High-Grade Fe 550D TMT Steel is Critical for Earthquake Resilience', slug: 'why-fe-550d-tmt-steel-earthquake-resilience', category: 'Engineering', excerpt: 'A comprehensive technical breakdown on steel grades, ductility ratios, and elongation properties.', status: 'Published', views_count: 980, published_at: '2026-10-04' },
  { id: 3, title: 'Cost Estimation Guide: Building Your Dream Villa in Coimbatore', slug: 'cost-estimation-guide-building-villa-coimbatore', category: 'Planning & Finance', excerpt: 'Step by step sq.ft rate breakdown covering foundation, structural masonry, MEP, and luxury finishing joinery.', status: 'Published', views_count: 2890, published_at: '2026-09-28' }
];

export const getAllBlogs = async (req, res, next) => {
  try {
    const { status, category } = req.query;

    if (checkDbConnection()) {
      const pool = getPool();
      let query = 'SELECT * FROM blogs WHERE 1=1';
      const params = [];

      if (status && status !== 'all') {
        query += ' AND status = ?';
        params.push(status);
      }

      if (category && category !== 'all') {
        query += ' AND category = ?';
        params.push(category);
      }

      query += ' ORDER BY id DESC';

      const [rows] = await pool.query(query, params);
      return res.json({ success: true, count: rows.length, data: rows });
    }

    let filtered = [...mockBlogs];
    if (status && status !== 'all') filtered = filtered.filter(b => b.status === status);
    if (category && category !== 'all') filtered = filtered.filter(b => b.category === category);

    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    next(error);
  }
};

export const getBlogByIdOrSlug = async (req, res, next) => {
  try {
    const { identifier } = req.params;

    if (checkDbConnection()) {
      const pool = getPool();
      const [rows] = await pool.query(
        'SELECT * FROM blogs WHERE id = ? OR slug = ? LIMIT 1',
        [identifier, identifier]
      );
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Article not found.' });
      }

      // Increment views
      await pool.query('UPDATE blogs SET views_count = views_count + 1 WHERE id = ?', [rows[0].id]);
      rows[0].views_count += 1;

      return res.json({ success: true, data: rows[0] });
    }

    const found = mockBlogs.find(b => b.id === Number(identifier) || b.slug === identifier);
    if (!found) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }
    found.views_count += 1;
    res.json({ success: true, data: found });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const { title, category, excerpt, content, cover_image, status = 'Published' } = req.body;

    if (!title || !category) {
      return res.status(400).json({ success: false, message: 'Title and category are required.' });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + `-${Date.now().toString().slice(-4)}`;

    if (checkDbConnection()) {
      const pool = getPool();
      const [result] = await pool.query(
        'INSERT INTO blogs (title, slug, category, excerpt, content, cover_image, status, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE())',
        [title, slug, category, excerpt || null, content || null, cover_image || null, status]
      );

      const [newBlog] = await pool.query('SELECT * FROM blogs WHERE id = ?', [result.insertId]);
      return res.status(201).json({ success: true, message: 'Article published successfully.', data: newBlog[0] });
    }

    const created = {
      id: mockBlogs.length + 1,
      title,
      slug,
      category,
      excerpt,
      content,
      cover_image,
      status,
      views_count: 0,
      published_at: new Date().toISOString().split('T')[0]
    };
    mockBlogs.unshift(created);
    res.status(201).json({ success: true, message: 'Article published successfully.', data: created });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, category, excerpt, content, cover_image, status } = req.body;

    if (checkDbConnection()) {
      const pool = getPool();
      await pool.query(
        `UPDATE blogs SET 
          title = COALESCE(?, title),
          category = COALESCE(?, category),
          excerpt = COALESCE(?, excerpt),
          content = COALESCE(?, content),
          cover_image = COALESCE(?, cover_image),
          status = COALESCE(?, status)
        WHERE id = ?`,
        [title, category, excerpt, content, cover_image, status, id]
      );

      const [updated] = await pool.query('SELECT * FROM blogs WHERE id = ?', [id]);
      if (updated.length === 0) {
        return res.status(404).json({ success: false, message: 'Article not found.' });
      }
      return res.json({ success: true, message: 'Article updated successfully.', data: updated[0] });
    }

    const idx = mockBlogs.findIndex(b => b.id === Number(id));
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }
    mockBlogs[idx] = { ...mockBlogs[idx], ...req.body };
    res.json({ success: true, message: 'Article updated successfully.', data: mockBlogs[idx] });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (checkDbConnection()) {
      const pool = getPool();
      const [result] = await pool.query('DELETE FROM blogs WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Article not found.' });
      }
      return res.json({ success: true, message: 'Article deleted successfully.' });
    }

    mockBlogs = mockBlogs.filter(b => b.id !== Number(id));
    res.json({ success: true, message: 'Article deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
