import ServiceDao from '../dao/serviceDao.mjs';
import Service from '../models/service.mjs';

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


describe('ServiceDao', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch all services', async () => {
        const mockServices = [
            { id: 1, name: 'Service A' },
            { id: 2, name: 'Service B' },
        ];

        Service.findAll.mockResolvedValue(mockServices);

        const services = await ServiceDao.getAllServices();
        expect(Service.findAll).toHaveBeenCalled();
        expect(services).toEqual(mockServices);
    });

    it('should fetch a service by ID', async () => {
        const mockService = { id: 1, name: 'Service A' };

        Service.findByPk.mockResolvedValue(mockService);

        const service = await ServiceDao.getServiceById(1);
        expect(Service.findByPk).toHaveBeenCalledWith(1);
        expect(service).toEqual(mockService);
    });

    it('should return null if service does not exist', async () => {
        Service.findByPk.mockResolvedValue(null);

        const service = await ServiceDao.getServiceById(999);
        expect(Service.findByPk).toHaveBeenCalledWith(999);
        expect(service).toBeNull();
    });
});
