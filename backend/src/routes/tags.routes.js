import express from 'express';
import {
    createTag,
    deleteTag,
    getTag,
    getTags,
    updateTag,
} from '../controllers/tags.controller.js';

const tagsRouter = express.Router();

tagsRouter.get('/', getTags);
tagsRouter.get('/:id', getTag);
tagsRouter.post('/', createTag);
tagsRouter.put('/:id', updateTag);
tagsRouter.delete('/:id', deleteTag);

export default tagsRouter;
