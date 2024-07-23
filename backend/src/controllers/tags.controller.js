import { db } from '../database/db.js';

export const getTags = (_req, res) => {
    const q = 'SELECT * FROM tags';
    
    db.query(q, (err, data) => {
        if(err) return res.json(err);

        if(data.length == 0) {
            return res.json({ message: 'No tags found' });
        }

        return res.status(200).json(data);
    });
}

export const getTag = (req, res) => {
    const q = 'SELECT * FROM tags WHERE id = ?';
    
    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.json(err);

        if(data.length == 0) {
            return res.json({ message: 'No tags found' });
        }
        
        return res.status(200).json(data);
    });
}

export const createTag = (req, res) => {
    const q = 'INSERT INTO tags (tag) VALUES (?)';

    const values = [
        req.body.tag
    ];

    db.query(q, [...values], (err) => {
        if(err) return res.json(err);
        return res.status(201).json({ message: 'Tag created successfully' });
    });
}