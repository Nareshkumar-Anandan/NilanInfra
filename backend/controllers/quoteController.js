import { getPool, checkDbConnection } from '../config/db.js';

let mockQuotations = [];

export const saveQuotation = async (req, res, next) => {
  try {
    const {
      client_name, clientName,
      phone,
      email,
      location,
      project_type, projectType,
      builtup_sqft, sqft,
      floors,
      spec_grade, grade,
      rate_per_sqft, ratePerSqFt,
      total_estimate, totalEstimate,
      breakdown
    } = req.body;

    const finalClient = client_name || clientName;
    const finalPhone = phone;
    const finalEmail = email || '';
    const finalLoc = location || 'Coimbatore';
    const finalType = project_type || projectType || 'Residential Villa';
    const finalSqft = builtup_sqft || sqft || 2000;
    const finalFloors = floors || 'G+1';
    const finalGrade = spec_grade || grade || 'Premium';
    const finalRate = rate_per_sqft || ratePerSqFt || 2550;
    const finalTotal = total_estimate || totalEstimate || (finalSqft * finalRate);

    if (!finalClient || !finalPhone) {
      return res.status(400).json({ success: false, message: 'Client name and phone are required.' });
    }

    const quote_ref = `NILAN-EST-${Math.floor(1000 + Math.random() * 9000)}`;

    if (checkDbConnection()) {
      const pool = getPool();
      const [result] = await pool.query(
        `INSERT INTO quotations 
          (quote_ref, client_name, phone, email, location, project_type, builtup_sqft, floors, spec_grade, rate_per_sqft, total_estimate, breakdown_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [quote_ref, finalClient, finalPhone, finalEmail, finalLoc, finalType, finalSqft, finalFloors, finalGrade, finalRate, finalTotal, JSON.stringify(breakdown || {})]
      );

      const [newQuote] = await pool.query('SELECT * FROM quotations WHERE id = ?', [result.insertId]);
      return res.status(201).json({
        success: true,
        message: 'Quotation generated and saved successfully.',
        data: newQuote[0]
      });
    }

    const created = {
      id: mockQuotations.length + 1,
      quote_ref,
      client_name: finalClient,
      phone: finalPhone,
      email: finalEmail,
      location: finalLoc,
      project_type: finalType,
      builtup_sqft: finalSqft,
      floors: finalFloors,
      spec_grade: finalGrade,
      rate_per_sqft: finalRate,
      total_estimate: finalTotal,
      breakdown_json: breakdown,
      created_at: new Date().toISOString()
    };
    mockQuotations.unshift(created);

    res.status(201).json({
      success: true,
      message: 'Quotation generated and saved successfully.',
      data: created
    });
  } catch (error) {
    next(error);
  }
};

export const getAllQuotations = async (req, res, next) => {
  try {
    if (checkDbConnection()) {
      const pool = getPool();
      const [rows] = await pool.query('SELECT * FROM quotations ORDER BY id DESC');
      return res.json({ success: true, count: rows.length, data: rows });
    }

    res.json({ success: true, count: mockQuotations.length, data: mockQuotations });
  } catch (error) {
    next(error);
  }
};

export const getQuotationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (checkDbConnection()) {
      const pool = getPool();
      const [rows] = await pool.query('SELECT * FROM quotations WHERE id = ? OR quote_ref = ? LIMIT 1', [id, id]);
      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Quotation not found.' });
      }
      return res.json({ success: true, data: rows[0] });
    }

    const found = mockQuotations.find(q => q.id === Number(id) || q.quote_ref === id);
    if (!found) {
      return res.status(404).json({ success: false, message: 'Quotation not found.' });
    }
    res.json({ success: true, data: found });
  } catch (error) {
    next(error);
  }
};
