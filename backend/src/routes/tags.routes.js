import express from 'express';
import { createTag, getTag, getTags } from '../controllers/tags.controller.js';

const tagsRouter = express.Router();

tagsRouter.get('/', getTags);
tagsRouter.get('/:id', getTag);
tagsRouter.post('/', createTag);

export default tagsRouter;