import express, { Request, Response } from 'express';
import cors from 'cors';
import pool from './dbconfig';
import { createUser, login } from '../src/services/UserService';

// import { connect } from 'http2';
// import { error } from 'console';

const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(bodyParser.json());

// Routes

app.get('/api/statistics', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM statistics');
    const femaleLifeExpectancy = result.rows.map((row) => ({
      country: row.country,
      life_expectancy: row.women,
    }));
    const maleLifeExpectancy = result.rows.map((row) => ({
      country: row.country,
      life_expectancy: row.men,
    }));

    res.json({
      femaleLifeExpectancy,
      maleLifeExpectancy,
    });
    // console.log('Sent');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.post('/api/signup', async (req: Request, res: Response) => {
  try {
    const user: {
      prenom: string;
      nom: string;
      email: string;
      password: string;
    } = {
      prenom: req.body.prenom,
      nom: req.body.nom,
      email: req.body.email,
      password: req.body.mot_de_passe,
    };

    await createUser(user);
    res.status(200).send('Utilisateur ajouté ! ');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.post('/api/login', async (req: Request, res: Response) => {
  try {
    await login(req.body.email, req.body.mot_de_passe);
    res.status(200).send('Vous êtes connecté ! ');

    // res.json(result.rows);
  } catch (error) {
    console.error('Erreur : ', error);
  }
});

app.get('/api/users', async (req: Request, res: Response) => {
  console.log('users');
  try {
    const result = await pool.query('SELECT * FROM utilisateur');
    const users = result.rows.map((row) => ({
      nom: row.nom,
      prenom: row.prenom,
    }));
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).send('server error');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
