import express from 'express';
import { getQuotes } from '../controllers/quotes.controller.js';


const router = express.Router();

router.get('/', getQuotes);

export default router;