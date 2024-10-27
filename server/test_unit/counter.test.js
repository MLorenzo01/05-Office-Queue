import CounterDao from '../dao/counterDao.mjs';



describe('CounterDao', () => {
    it('should fetch all available counters', async () => {
        const counters = await CounterDao.getAvailablesCounters();
        expect(counters.length).toBe(3);
    });

    it('should fetch all counters', async () => {
        const counters = await CounterDao.getAllCounters();
        expect(counters.length).toBe(3);
    });

    it('should update the isOccupied attribute of a counter', async () => {
        const updatedCounter = await CounterDao.updateIsOccupiedCounter(1, true);
        expect(updatedCounter.isOccupied).toBe(true);
    });

    it('should return null if counter does not exist', async () => {
        const result = await CounterDao.updateIsOccupiedCounter(999, true);
        expect(result).toBeNull();
    });

    it('should fetch counters with the latest ticket', async () => {

        const countersWithLatestTicket = await CounterDao.getCountersWithLatestTicket();
        expect(countersWithLatestTicket.length).toBe(3);
    });
});
