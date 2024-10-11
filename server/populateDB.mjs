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
      { number: 1 },
      { number: 2 },
      { number: 3 },
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
      { code: 1001, serviceId: 1 },
      { code: 1002, serviceId: 2 },
      { code: 1003, serviceId: 3 },
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
