import express from 'express';
import {
    createTag,
    deleteTag,
    getTag,
    getTags,
    updateTag,
} from '../controllers/tags.controller.js';

const router = express.Router();

router.get('/', getTags);
router.get('/:id', getTag);
router.post('/', createTag);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);

export default router;
