import { DataTypes } from 'sequelize';
import sequelize from '../db.mjs';
import Service from './service.mjs';

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  serviceId: {
    type: DataTypes.INTEGER,
    references: {
      model: Service,
      key: 'id',
    },
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

// Define association
Ticket.belongsTo(Service, { foreignKey: 'serviceId' });

export default Ticket;
