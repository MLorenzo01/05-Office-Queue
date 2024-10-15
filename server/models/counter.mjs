import { DataTypes } from 'sequelize';
import sequelize from '../db.mjs';

const Counter = sequelize.define('Counter', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isOccupied: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  timestamps: false,
});

export default Counter;
