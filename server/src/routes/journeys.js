import express from 'express';
import { saveJourney, getJourneys } from '../controllers/journeyController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', saveJourney);
router.get('/', getJourneys);

export default router;
