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

export async function signIn(
  email: string,
  password: string
): Promise<boolean | any> {
  try {
    const result = await pool.query(
      'SELECT * FROM utilisateur WHERE email = $1 AND mot_de_passe = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      return { success: false }; // User not found
    }

    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    });

    return { success: true, token };
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function checkPassword(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const result = await pool.query(
      'SELECT mot_de_passe FROM utilisateur WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return false; // User not found
    }
    const storedPasswordHash = result.rows[0].mot_de_passe;
    const isPasswordValid = await bcrypt.compare(password, storedPasswordHash);

    return isPasswordValid;
  } catch (error) {
    console.error('Error checking password:', error);
    throw error;
  }
}
