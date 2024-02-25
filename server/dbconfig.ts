import { Pool, PoolConfig } from 'pg';

const dbConfig: PoolConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'time_thrive_db',
  password: 'Asus94000',
  port: 5432,
};

const pool = new Pool(dbConfig);

export default pool;
