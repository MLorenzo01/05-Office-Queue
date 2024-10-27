import CounterDao from '../dao/counterDao.mjs';
import Counter from '../models/counter.mjs';
import Service from '../models/service.mjs';
import Ticket from '../models/ticket.mjs';
import sequelize from '../db.mjs';

jest.mock('../models/counter.mjs', () => ({
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
}));

jest.mock('../models/service.mjs', () => ({
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
}));

jest.mock('../models/ticket.mjs', () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
}));

describe('CounterDao', () => {
    beforeAll(async () => {
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch all available counters', async () => {
        Counter.findAll.mockResolvedValue([
            { id: 1, number: 1, isOccupied: false },
            { id: 2, number: 2, isOccupied: false },
            { id: 3, number: 3, isOccupied: false },
        ]);

        const counters = await CounterDao.getAvailablesCounters();
        expect(Counter.findAll).toHaveBeenCalledWith({
            where: { isOccupied: false },
        });
        expect(counters.length).toBe(3);
    });

    it('should fetch all counters', async () => {
        Counter.findAll.mockResolvedValue([
            { id: 1, number: 1, isOccupied: false },
            { id: 2, number: 2, isOccupied: false },
            { id: 3, number: 3, isOccupied: true },
        ]);

        const counters = await CounterDao.getAllCounters();
        expect(Counter.findAll).toHaveBeenCalled();
        expect(counters.length).toBe(3);
    });

    it('should update the isOccupied attribute of a counter', async () => {
        const mockCounter = { id: 1, isOccupied: true, dataValues: { id: 1, isOccupied: true } };
        Counter.findByPk.mockResolvedValue(mockCounter);
        Counter.update.mockResolvedValue([1, [mockCounter]]);

        const updatedCounter = await CounterDao.updateIsOccupiedCounter(1, true);
        expect(Counter.findByPk).toHaveBeenCalledWith(1);
        expect(Counter.update).toHaveBeenCalledWith(
            { isOccupied: true },
            {
                where: { id: 1 },
                returning: true, // Ensure this is included for returning updated record
            }
        );
        expect(updatedCounter.isOccupied).toBe(true);
    });

    it('should return null if counter does not exist', async () => {
        Counter.findByPk.mockResolvedValue(null);

        const result = await CounterDao.updateIsOccupiedCounter(999, true);
        expect(Counter.findByPk).toHaveBeenCalledWith(999);
        expect(result).toBeNull();
    });

    it('should fetch counters with the latest ticket', async () => {
        const mockCounters = [
            { id: 1, number: 1, get: jest.fn(() => ({ id: 1, number: 1 })) },
            { id: 2, number: 2, get: jest.fn(() => ({ id: 2, number: 2 })) },
            { id: 3, number: 3, get: jest.fn(() => ({ id: 3, number: 3 })) },
        ];

        const mockTickets = [
            { code: 1001, counterID: 1, isServed: true, servedNow: new Date() },
            { code: 1002, counterID: 2, isServed: true, servedNow: new Date() },
            null, // No ticket for the third counter
        ];

        Counter.findAll.mockResolvedValue(mockCounters);
        Ticket.findOne.mockImplementation((options) => {
            const { where } = options;
            const ticket = mockTickets.find(t => t && t.counterID === where.counterID);
            return Promise.resolve(ticket);
        });

        const countersWithLatestTicket = await CounterDao.getCountersWithLatestTicket();
        expect(Counter.findAll).toHaveBeenCalled();
        expect(countersWithLatestTicket.length).toBe(3);
        expect(countersWithLatestTicket[0].latestTicket).toEqual(mockTickets[0]);
        expect(countersWithLatestTicket[1].latestTicket).toEqual(mockTickets[1]);
        expect(countersWithLatestTicket[2].latestTicket).toBeNull();
    });

    it('should fetch services by counter ID', async () => {
        const mockCounter = { id: 1, Services: [{ id: 1, name: 'Service A' }] };
        Counter.findByPk.mockResolvedValue(mockCounter);

        const services = await CounterDao.getServiceByCounterId(1);
        expect(Counter.findByPk).toHaveBeenCalledWith(1, { include: Service });
        expect(services).toEqual(mockCounter.Services);
    });

    it('should return null if no services are found for a counter', async () => {
        Counter.findByPk.mockResolvedValue(null);

        const services = await CounterDao.getServiceByCounterId(999);
        expect(Counter.findByPk).toHaveBeenCalledWith(999, { include: Service });
        expect(services).toBeNull();
    });
});
