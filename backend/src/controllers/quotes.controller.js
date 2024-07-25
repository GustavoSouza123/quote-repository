import { db } from '../database/db.js';

export const getQuotes = async (_req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM quotes');

        if (rows.length == 0) {
            return res.json({ message: 'No quotes found' });
        }

        return res.status(200).json(rows);
    } catch (err) {
        return res.json(err);
    }
};

export const getQuote = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM quotes WHERE id = ?', [
            req.params.id,
        ]);

        if (rows.length == 0) {
            return res.json({ message: 'No quotes found' });
        }

        return res.status(200).json(rows);
    } catch (err) {
        return res.json(err);
    }
};

export const createQuote = async (req, res) => {
    try {
        const values = [req.body.quote, req.body.author];
        await db.query(
            'INSERT INTO quotes (quote, author) VALUES (?, ?)',
            values
        );

        const [rows] = await db.query(
            'SELECT id FROM quotes ORDER BY id DESC LIMIT 1'
        );
        const quoteId = rows[0].id;

        const tags = req.body.tags;
        tags.forEach(async (tag) => {
            await db.query(
                'INSERT INTO quotes_tags (quoteId, tagId) VALUES (?, ?)',
                [quoteId, tag]
            );
        });

        return res.status(201).json({ message: 'Quote created successfully' });
    } catch (err) {
        return res.json(err);
    }
};

export const updateQuote = async (req, res) => {
    try {
        const values = [req.body.quote, req.body.author, req.params.id];
        await db.query(
            'UPDATE quotes SET quote = ?, author = ? WHERE id = ?',
            values
        );

        return res.status(200).json({ message: 'Quote updated successfully' });
    } catch (err) {
        return res.json(err);
    }
};

export const deleteQuote = async (req, res) => {
    try {
        await db.query(
            'DELETE FROM quotes WHERE id = ?',
            req.params.id
        );
        return res.status(200).json({ message: 'Quote deleted successfully' });
    } catch (err) {
        return res.json(err);
    }
};
