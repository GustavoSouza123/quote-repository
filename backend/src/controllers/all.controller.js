import { db } from '../database/db.js';

export const getQuotesTags = async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT q.*, t.id AS tagId, t.tag FROM quotes AS q INNER JOIN quotes_tags AS qt ON q.id = qt.quoteId INNER JOIN tags AS t ON t.id = qt.tagId ORDER BY t.tag'
        );

        if (rows.length == 0) {
            return res.json({ message: 'No quotes found' });
        }

        return res.status(200).json(rows);
    } catch (err) {
        return res.json(err);
    }
};
