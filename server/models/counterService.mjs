import { DataTypes } from 'sequelize';
import sequelize from '../db.mjs';
import Counter from './counter.mjs';
import Service from './service.mjs';

const CounterService = sequelize.define('CounterService', {
  counterId: {
    type: DataTypes.INTEGER,
    references: {
      model: Counter,
      key: 'id',
    },
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
}, {
  timestamps: false,
});

// Define associations
CounterService.belongsTo(Counter, { foreignKey: 'counterId' });
CounterService.belongsTo(Service, { foreignKey: 'serviceId' });

export default CounterService;
