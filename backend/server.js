/**
 * AFRIMÉTIERS HUB — REST API Backend Controller (Node.js / Express + MySQL2)
 * Enforces Business Rules #1, #2, #3, and #4 at the API Layer
 */

const express = require('express');
const mysql = require('mysql2/promise');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// MySQL Connection Pool (UTF8MB4 for Bilingual FR/AR)
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'afrimetiers_hub',
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10
});

/**
 * PUBLIC ENDPOINT 1: Multi-Criteria Search of Published Artisans
 * Enforces Business Rule #1: status = 'Publié' ONLY
 */
app.get('/api/artisans', async (req, res) => {
  try {
    const { category_slug, country_code, city } = req.query;
    let sql = `
      SELECT * FROM v_public_artisans
      WHERE 1 = 1
    `;
    const params = [];

    if (category_slug) {
      sql += ` AND category_slug = ?`;
      params.push(category_slug);
    }
    if (country_code) {
      sql += ` AND country_code = ?`;
      params.push(country_code);
    }
    if (city) {
      sql += ` AND (city_fr LIKE ? OR city_ar LIKE ?)`;
      params.push(`%${city}%`, `%${city}%`);
    }

    sql += ` ORDER BY is_featured DESC, years_experience DESC`;
    const [rows] = await pool.execute(sql, params);
    return res.status(200).json({ data: rows });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur lors de la recherche.', details: err.message });
  }
});

/**
 * PUBLIC ENDPOINT 2: Detailed Artisan Profile
 * Enforces Business Rule #1: Returns 404 if artisan status !== 'Publié'
 */
app.get('/api/artisans/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT * FROM v_public_artisans WHERE id = ? LIMIT 1`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({
        error: 'Profil introuvable ou non publié (Règle Métier #1).'
      });
    }
    const [portfolio] = await pool.execute(
      `SELECT id, title_fr, title_ar, image_url, estimated_price FROM portfolio_items WHERE artisan_id = ?`,
      [req.params.id]
    );
    return res.status(200).json({ data: { ...rows[0], portfolio } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * PUBLIC ENDPOINT 3: Submit a Quotation Request ("Demande de Devis")
 * Enforces Business Rules #2 (Artisan must be 'Publié') & #3 (Unique Reference)
 */
app.post('/api/quotes', async (req, res) => {
  const {
    artisan_id,
    client_name,
    client_email,
    client_phone,
    client_country,
    service_title,
    project_description,
    estimated_budget,
    desired_deadline,
    preferred_lang = 'fr'
  } = req.body;

  // 1. Input Payload Validation
  const missingFields = [];
  if (!artisan_id) missingFields.push('artisan_id');
  if (!client_name || client_name.trim().length < 2) missingFields.push('client_name');
  if (!client_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client_email)) missingFields.push('client_email');
  if (!client_phone) missingFields.push('client_phone');
  if (!client_country) missingFields.push('client_country');
  if (!service_title) missingFields.push('service_title');
  if (!project_description || project_description.trim().length < 10) missingFields.push('project_description');

  if (missingFields.length > 0) {
    return res.status(422).json({
      error: 'Validation échouée : champs invalides ou manquants.',
      fields: missingFields
    });
  }

  try {
    // 2. Business Rule #2 Check: Verify target artisan exists and is 'Publié'
    const [artisanRows] = await pool.execute(
      `SELECT id, status FROM artisans WHERE id = ? LIMIT 1`,
      [artisan_id]
    );

    if (artisanRows.length === 0 || artisanRows[0].status !== 'Publié') {
      return res.status(403).json({
        error: 'RÈGLE MÉTIER #2 : Une demande de devis ne peut être associée qu’à un artisan au statut "Publié".'
      });
    }

    // 3. Business Rule #3: Generate Cryptographically Unique Quote Reference
    const randomSuffix = crypto.randomInt(1000, 9999);
    const reference = `DEV-2026-${Date.now().toString().slice(-4)}-${randomSuffix}`;

    const [result] = await pool.execute(
      `INSERT INTO quote_requests (
        reference, artisan_id, client_name, client_email, client_phone,
        client_country, service_title, project_description, estimated_budget,
        desired_deadline, preferred_lang, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Nouvelle')`,
      [
        reference,
        artisan_id,
        client_name.trim(),
        client_email.trim(),
        client_phone.trim(),
        client_country.trim(),
        service_title.trim(),
        project_description.trim(),
        estimated_budget || null,
        desired_deadline || null,
        preferred_lang === 'ar' ? 'ar' : 'fr'
      ]
    );

    return res.status(201).json({
      message: 'Demande de devis enregistrée avec succès.',
      data: {
        id: result.insertId,
        reference,
        status: 'Nouvelle'
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/**
 * ADMIN ENDPOINT 4: Update Quotation Request Status
 * Enforces Business Rule #4: Cannot revert back to 'Nouvelle' once processed
 */
app.patch('/api/admin/quotes/:id/status', async (req, res) => {
  const { status, admin_notes, admin_id } = req.body;
  const allowedStatuses = ['Nouvelle', 'En cours', 'Acceptée', 'Refusée', 'Clôturée'];

  if (!allowedStatuses.includes(status)) {
    return res.status(422).json({ error: 'Statut de devis invalide.' });
  }

  try {
    const [existing] = await pool.execute(
      `SELECT id, status FROM quote_requests WHERE id = ? LIMIT 1`,
      [req.params.id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Demande de devis introuvable.' });
    }

    // Business Rule #4 State Machine Guard
    if (existing[0].status !== 'Nouvelle' && status === 'Nouvelle') {
      return res.status(409).json({
        error: 'RÈGLE MÉTIER #4 (Machine à états) : Une demande déjà traitée ne peut pas revenir au statut "Nouvelle".'
      });
    }

    await pool.execute(
      `UPDATE quote_requests
       SET status = ?, admin_notes = COALESCE(?, admin_notes), handled_by = COALESCE(?, handled_by)
       WHERE id = ?`,
      [status, admin_notes || null, admin_id || null, req.params.id]
    );

    return res.status(200).json({
      message: 'Statut de la demande de devis mis à jour.',
      data: { id: Number(req.params.id), status }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = app;
