import { db } from '../database/db.js';

export const getQuotes = (_req, res) => {
    const q = "SELECT * FROM quotes";
    
    db.query(q, (err, data) => {
        if(err) return res.json(err);
        return res.status(200).json(data);
    });
}