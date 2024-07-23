import express from 'express';
import cors from 'cors';
import routes from './src/routes/quotes.routes.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use('/api/quotes', routes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});