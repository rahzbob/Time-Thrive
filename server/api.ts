import express, { Request, Response } from 'express';
import cors from 'cors';
import pool from './dbconfig';
// import { error } from 'console';

const app = express();

app.use(cors());

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get('/api/countries', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT country FROM statistics');
    res.json(result.rows);
    // console.log('Sent');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.post('/api/signup', async (req: Request, res: Response) => {
  try {
    const values = [
      req.body.nom,
      req.body.prenom,
      req.body.email,
      req.body.mot_de_passe,
    ];
    const result = await pool.query(
      'INSERT INTO utilisateur(id, nom, prenom,email, mot_de_passe) VALUES   ($1,$2,$3,$4)',
      values
    );
    res.json(result.rows);
    // console.log('Sent');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.get('/api/login', async (req: Request, res: Response) => {
  try {
    const values = [req.body.email, req.body.mot_de_passe];
    const result = await pool.query(
      'SELECT * FROM utilisateur(id,nom, prenom,email, mot_de_passe) WHERE email = ($1) and mot_de_passe = ($2)',
      values
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur : ', error);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
