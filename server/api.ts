import express, { Request, Response } from 'express';
import pool from './dbconfig'; // Importer la configuration de la base de données depuis le dossier server

const app = express();

app.get('/api/data', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM votre_table');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
