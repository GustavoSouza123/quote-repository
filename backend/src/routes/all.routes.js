import express from 'express';
import { getQuotesTags } from '../controllers/all.controller.js';

const router = express.Router();

router.get('/', getQuotesTags);

export default router;
