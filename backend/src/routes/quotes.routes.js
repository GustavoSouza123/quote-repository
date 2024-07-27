import express from 'express';
import {
    createQuote,
    deleteQuote,
    getQuote,
    getQuotes,
    updateQuote,
} from '../controllers/quotes.controller.js';

const router = express.Router();

router.get('/', getQuotes);
router.get('/:id', getQuote);
router.post('/', createQuote);
router.put('/:id', updateQuote);
router.delete('/:id', deleteQuote);

export default router;
