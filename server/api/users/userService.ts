import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../db/dbConfig';
import { User } from './userModels';

require('dotenv').config();

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

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || 'Xk7@QzY2&nLz5#Wq8rV9Tn6Jc4Ry!gA$';

export async function signIn(email: string, password: string) {
  const user = await pool.query('SELECT * FROM utilisateur WHERE email = $1', [
    email,
  ]);
  const passwordIsValid = await bcrypt.compare(
    password,
    user.rows[0].mot_de_passe
  );

  if (passwordIsValid) {
    const token = jwt.sign({ userId: user.rows[0].id }, ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });
    return token;
  }
}
