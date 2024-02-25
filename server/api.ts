import express, { Request, Response } from 'express';
import cors from 'cors';
import pool from './dbconfig';

const app = express();

app.use(cors());

app.get('/api/countries', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT country FROM statistics');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
