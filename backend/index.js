import express from 'express';
import cors from 'cors';
import quotesRoutes from './src/routes/quotes.routes.js';
import tagsRoutes from './src/routes/tags.routes.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use('/api/quotes', quotesRoutes);
app.use('/api/tags', tagsRoutes);

app.get('/', (_req, res) => {
    res.status(200).json({ message: 'Server running' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});