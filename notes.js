// mysql vs mysql2

// mysql
const getQuotes1 = (_req, res) => {
    db.query(q, (err, data) => {
        if (err) return res.json(err);

        if (data.length == 0) {
            return res.json({ message: 'No quotes found' });
        }

        return res.status(200).json(data);
    });
};

// mysql2
const getQuotes2 = async (_req, res) => {
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