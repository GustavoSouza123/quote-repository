import { db } from '../database/db.js';

export const getTags = async (_req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tags');

        if (rows.length == 0) {
            return res.json({ message: 'No tags found' });
        }

        return res.status(200).json(rows);
    } catch (err) {
        return res.json(err);
    }
};

export const getTag = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tags WHERE id = ?', req.params.id);

        if (rows.length == 0) {
            return res.json({ message: 'No tags found' });
        }

        return res.status(200).json(rows);
    } catch (err) {
        return res.json(err);
    }
};

export const createTag = async (req, res) => {
    try {
        await db.query('INSERT INTO tags (tag) VALUES (?)', req.body.tag);
        return res.status(201).json({ message: 'Tag created successfully' });
    } catch (err) {
        return res.json(err);
    }
};

export const updateTag = async (req, res) => {
    try {
        const values = [req.body.tag, req.params.id];
        await db.query('UPDATE tags SET tag = ?, updatedAt = NOW() WHERE id = ?', values);
        return res.status(200).json({ message: 'Tag updated successfully' });
    } catch (err) {
        return res.json(err);
    }
};

export const deleteTag = async (req, res) => {
    try {
        await db.query('DELETE FROM tags WHERE id = ?', req.params.id);
        return res.status(200).json({ message: 'Tag deleted successfully' });
    } catch (err) {
        return res.json(err);
    }
};
