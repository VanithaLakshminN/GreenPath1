import pool from '../db.js';

// Save a new journey
export const saveJourney = async (req, res) => {
  const {
    userId,
    sourceText,
    destinationText,
    mode,
    routeId,
    metrics,
    co2SavedKg,
    media,
    startedAt,
    completedAt,
  } = req.body;

  try {
    if (!userId || !sourceText || !destinationText || !mode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query(
      `INSERT INTO journeys (user_id, start_location, end_location, distance, duration, transport_mode, co2_saved) 
       VALUES ((SELECT id FROM users WHERE username = $1), $2, $3, $4, $5, $6, $7) 
       RETURNING id`,
      [
        userId,
        sourceText,
        destinationText,
        metrics?.distanceKm || 0,
        metrics?.durationSeconds || 0,
        mode,
        co2SavedKg || 0,
      ]
    );

    res.status(201).json({
      message: 'Journey saved successfully',
      journeyId: result.rows[0].id,
    });
  } catch (error) {
    console.error('Save journey error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get journeys for a user
export const getJourneys = async (req, res) => {
  const { userId } = req.query;

  try {
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const result = await pool.query(
      `SELECT j.*, u.username 
       FROM journeys j 
       JOIN users u ON j.user_id = u.id 
       WHERE u.username = $1 
       ORDER BY j.created_at DESC`,
      [userId]
    );

    const journeys = result.rows.map((row) => ({
      id: row.id.toString(),
      userId: row.username,
      sourceText: row.start_location,
      destinationText: row.end_location,
      mode: row.transport_mode,
      routeId: `journey_${row.id}`,
      metrics: {
        distanceKm: parseFloat(row.distance) || 0,
        durationSeconds: parseInt(row.duration) || 0,
        co2Kg: parseFloat(row.co2_saved) || 0,
        monetaryCost: 0,
      },
      co2SavedKg: parseFloat(row.co2_saved) || 0,
      startedAt: new Date(row.created_at).getTime(),
      completedAt: new Date(row.created_at).getTime(),
      media: [],
    }));

    res.json({ journeys });
  } catch (error) {
    console.error('Get journeys error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
