import { Sequelize } from 'sequelize';

// Create SQLite connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // Path to SQLite file
  logging: false, // Disable logging  
});

export default sequelize;