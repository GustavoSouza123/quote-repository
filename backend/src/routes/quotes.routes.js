import express from 'express';
import {
    createQuote,
    deleteQuote,
    getQuote,
    getQuotes,
    updateQuote,
} from '../controllers/quotes.controller.js';

const quotesRouter = express.Router();

quotesRouter.get('/', getQuotes);
quotesRouter.get('/:id', getQuote);
quotesRouter.post('/', createQuote);
quotesRouter.put('/:id', updateQuote);
quotesRouter.delete('/:id', deleteQuote);

export default quotesRouter;
