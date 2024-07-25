import { db } from '../database/db.js';

export const getQuotes = (_req, res) => {
    const q = 'SELECT * FROM quotes';

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        if (data.length == 0) {
            return res.json({ message: 'No quotes found' });
        }

        return res.status(200).json(data);
    });
};

export const getQuote = (req, res) => {
    const q = 'SELECT * FROM quotes WHERE id = ?';

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);

        if (data.length == 0) {
            return res.json({ message: 'No quotes found' });
        }

        return res.status(200).json(data);
    });
};

export const createQuote = (req, res) => {
    const q = 'INSERT INTO quotes (quote, author) VALUES (?, ?)';

    const values = [req.body.quote, req.body.author];

    db.query(q, [...values], (err) => {
        if (err) return res.json(err);
        return res.status(201).json({ message: 'Quote created successfully' });
    });
};

export const updateQuote = (req, res) => {
    const q = 'UPDATE quotes SET quote = ?, author = ? WHERE id = ?';

    const values = [req.body.quote, req.body.author];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);
        return res.status(200).json({ message: 'Quote updated successfully' });
    });
};

export const deleteQuote = (req, res) => {
    const q = 'DELETE FROM quotes WHERE id = ?';

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);
        return res.status(200).json({ message: 'Quote deleted successfully' });
    });
};
