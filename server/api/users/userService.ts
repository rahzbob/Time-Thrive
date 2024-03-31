import pool from '../../db/dbConfig';
import { User } from './userModels';

require('dotenv').config();
process.env.ACCESS_TOKEN_SECRET;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export async function createUser(user: User) {
  //génération du salt et hachage du MDP : user.password.
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  const user_hashed: string[] = [user.nom, user.prenom, user.email, hash];
  await pool.query(
    'INSERT INTO utilisateur(nom, prenom,email, mot_de_passe) VALUES ($1,$2,$3,$4)',
    user_hashed
  );
}

export async function signIn(email: string, password: string) {
  const user = await pool.query('SELECT * FROM utilisateur WHERE email = $1', [
    email,
  ]);

  if (user.rows.length === 0) {
    throw new Error('Utilisateur introuvable');
  }
  const passwordIsValid = await bcrypt.compare(
    password,
    user.rows[0].mot_de_passe
  );
  console.log(passwordIsValid);

  if (passwordIsValid == true) {
    console.log('Ok.');
    const accessToken = generateAccessToken(user.rows[0]);
    console.log('accessToken', accessToken);
  }
}

function generateAccessToken(user: User) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1800s',
  });
}
