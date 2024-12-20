import sequelize from './db.mjs';
import Service from './models/service.mjs';
import Ticket from './models/ticket.mjs';
import Counter from './models/counter.mjs';
import CounterService from './models/counterService.mjs';

const populateDatabase = async () => {
  try {
    // Sample data for services
    const services = [
      { name: 'Shipping', estimatedTime: 30 },
      { name: 'Account management', estimatedTime: 45 },
      { name: 'Pickup Service', estimatedTime: 60 },
    ];

    // Insert services
    const insertedServices = await Service.bulkCreate(services);
    console.log('Services populated');

    // Sample data for counters
    const counters = [
      {number: 1, isOccupied: false},
      {number: 2, isOccupied: false},
      {number: 3, isOccupied: false},
    ];

    // Insert counters
    const insertedCounters = await Counter.bulkCreate(counters);
    console.log('Counters populated');

    // Sample data for counter services (many-to-many relationship)
    const counterServices = [
      { counterId: insertedCounters[0].id, serviceId: insertedServices[0].id },
      { counterId: insertedCounters[1].id, serviceId: insertedServices[1].id },
      { counterId: insertedCounters[1].id, serviceId: insertedServices[2].id },
      { counterId: insertedCounters[2].id, serviceId: insertedServices[0].id },
      { counterId: insertedCounters[2].id, serviceId: insertedServices[2].id },
    ];


    // Insert counter services
    await CounterService.bulkCreate(counterServices);
    console.log('Counter services populated!');

    // Sample data for tickets
    const tickets = [
      { code: 1001, serviceId: 1, isServed: true, servedNow: new Date("2024-10-17 07:06:53.979 +00:00"), counterID: 1},
      { code: 1002, serviceId: 2, isServed: true, servedNow: new Date("2024-10-17 08:06:53.979 +00:00"), counterID: 1},
      { code: 1003, serviceId: 3, isServed: true, servedNow: new Date("2024-10-17 09:06:53.979 +00:00"), counterID: 2},
    ];

    // Insert tickets
    await Ticket.bulkCreate(tickets);
    console.log('Tickets populated!');

    console.log('Database has been populated with initial data.');
  } catch (error) {
    console.error('Error populating database:', error);
  }
};

export default populateDatabase;
