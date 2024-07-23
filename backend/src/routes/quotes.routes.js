import express from 'express';
import { createQuote, getQuote, getQuotes } from '../controllers/quotes.controller.js';

const quotesRouter = express.Router();

quotesRouter.get('/', getQuotes);
quotesRouter.get('/:id', getQuote);
quotesRouter.post('/', createQuote);

export default quotesRouter;