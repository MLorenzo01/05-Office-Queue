import CounterDao from '../dao/counterDao.mjs';
import Counter from '../models/counter.mjs';

jest.mock('../models/counter.mjs', () => ({
    Counter: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        update: jest.fn(),
    }
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
        expect(Counter.findAll).toHaveBeenCalled();
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
        const mockCounter = { id: 1, isOccupied: true };
        Counter.findByPk.mockResolvedValue(mockCounter);
        Counter.update.mockResolvedValue([1, [mockCounter]]);

        const updatedCounter = await CounterDao.updateIsOccupiedCounter(1, true);
        expect(Counter.findByPk).toHaveBeenCalledWith(1);
        expect(Counter.update).toHaveBeenCalledWith(
            { isOccupied: true },
            { where: { id: 1 } }
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
        // Dati finti per il test
        const mockCountersWithTickets = [
            { id: 1, number: 1, latestTicket: { code: 1001 } },
            { id: 2, number: 2, latestTicket: { code: 1002 } },
            { id: 3, number: 3, latestTicket: { code: 1003 } },
        ];

        Counter.findAll.mockResolvedValue(mockCountersWithTickets);

        const countersWithLatestTicket = await CounterDao.getCountersWithLatestTicket();
        expect(Counter.findAll).toHaveBeenCalled();
        expect(countersWithLatestTicket.length).toBe(3);
    });
});
