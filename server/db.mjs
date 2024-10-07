import sqlite from 'sqlite3';
import { Sequelize } from 'sequelize';

// Open the SQLite database
const db = new sqlite.Database('database.sqlite', // DB filename
  (err) => { if (err) throw err; });

// Create SQLite connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // Path to SQLite file
  logging: false, // Disable logging  
});

export default sequelize;
