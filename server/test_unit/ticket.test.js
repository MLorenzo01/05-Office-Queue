// test_unit/ticket.test.js

import TicketDao from '../dao/ticketDao.mjs';
import Ticket from '../models/ticket.mjs';
import CounterService from '../models/counterService.mjs';
import Service from '../models/service.mjs';
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
    create: jest.fn(),
}));



jest.mock('../models/counterService.mjs', () => ({
    findAll: jest.fn(),
}));

jest.mock('../models/service.mjs', () => ({})); // Assuming Service doesn't need specific mocks for these tests

describe('TicketDao', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get a ticket by ID', async () => {
        const mockTicket = { id: 1, code: '1001' };
        Ticket.findByPk.mockResolvedValue(mockTicket);

        const ticket = await TicketDao.getTicketById(1);
        expect(Ticket.findByPk).toHaveBeenCalledWith(1);
        expect(ticket).toEqual(mockTicket);
    });

    it('should create a new ticket', async () => {
        const ticketData = { code: '1001', serviceId: 1 };
        const mockTicket = { id: 1, ...ticketData };
        Ticket.create.mockResolvedValue(mockTicket);

        const newTicket = await TicketDao.createTicket(ticketData);
        expect(Ticket.create).toHaveBeenCalledWith(ticketData);
        expect(newTicket).toEqual(mockTicket);
    });

    it('should get the last ticket of today', async () => {
        const mockLastTicket = { id: 1, code: '1001', createdAt: new Date() };
        Ticket.findOne.mockResolvedValue(mockLastTicket);

        const lastTicket = await TicketDao.getTodayLastTicket();
        expect(Ticket.findOne).toHaveBeenCalled();
        expect(lastTicket).toEqual(mockLastTicket);
    });

    it('should take a ticket to served given the serviceId', async () => {
        const mockTicket = { id: 1, isServed: false, save: jest.fn() };
        Ticket.findOne.mockResolvedValue(mockTicket);

        const servedTicket = await TicketDao.takeTicketToServed(1, 2);
        expect(Ticket.findOne).toHaveBeenCalledWith({
            where: {
                serviceId: 1,
                isServed: false,
            },
            order: [['createdAt', 'ASC']],
        });
        expect(mockTicket.isServed).toBe(true);
        expect(mockTicket.servedNow).toBeInstanceOf(Date);
        expect(mockTicket.counterID).toBe(2);
        expect(mockTicket.save).toHaveBeenCalled();
    });

    it('should return null if no ticket is available to serve', async () => {
        Ticket.findOne.mockResolvedValue(null);

        const servedTicket = await TicketDao.takeTicketToServed(1, 2);
        expect(Ticket.findOne).toHaveBeenCalled();
        expect(servedTicket).toBeNull();
    });

    it('should get services related to the counter', async () => {
        const mockServices = [{ id: 1, counterId: 1, serviceId: 1 }];
        CounterService.findAll.mockResolvedValue(mockServices);

        const services = await TicketDao.getServiceByCounterId(1);
        expect(CounterService.findAll).toHaveBeenCalledWith({
            where: { counterId: 1 },
        });
        expect(services).toEqual(mockServices);
    });

    it('should retrieve service with max estimated time', async () => {
        const mockServices = [{ serviceId: 1 }];
        TicketDao.getServiceByCounterId = jest.fn().mockResolvedValue(mockServices);

        const mockTickets = [
            { serviceId: 1, estimatedTime: 5 },
            { serviceId: 1, estimatedTime: 10 },
        ];
        Ticket.findAll.mockResolvedValue(mockTickets);

        const result = await TicketDao.getServiceWithMaxEstimatedTime(1);
        expect(TicketDao.getServiceByCounterId).toHaveBeenCalledWith(1);
        expect(Ticket.findAll).toHaveBeenCalled();
        expect(result).toEqual(mockTickets);
    });

    it('should get the next customer ticket', async () => {
        const mockTicket = { id: 1, code: '1001', isServed: false };
        Ticket.findOne.mockResolvedValue(mockTicket);

        const nextTicket = await TicketDao.getNextCustomerTicket(1);
        expect(Ticket.findOne).toHaveBeenCalledWith({
            where: {
                serviceId: 1,
                isServed: false,
            },
            order: [['createdAt', 'ASC']],
        });
        expect(nextTicket).toEqual(mockTicket);
    });

    it('should return null if no next customer ticket is available', async () => {
        Ticket.findOne.mockResolvedValue(null);

        const nextTicket = await TicketDao.getNextCustomerTicket(1);
        expect(nextTicket).toBeNull();
    });

    it('should get all served tickets', async () => {
        const mockTickets = [
            { id: 1, code: '1001', isServed: true },
            { id: 2, code: '1002', isServed: true },
        ];
        Ticket.findAll.mockResolvedValue(mockTickets);

        const tickets = await TicketDao.getServedTickets();
        expect(Ticket.findAll).toHaveBeenCalledWith({
            where: { isServed: true },
            order: [['servedNow', 'DESC']],
        });
        expect(tickets).toEqual(mockTickets);
    });

    it('should get the latest served tickets by counter', async () => {
        const mockTickets = [
            { id: 1, code: '1001', counterId: 1, servedNow: new Date() },
        ];
        Ticket.findAll.mockResolvedValue(mockTickets);

        const tickets = await TicketDao.getLatestServedTicketsByCounter();
        expect(Ticket.findAll).toHaveBeenCalledWith({
            where: { isServed: true },
            attributes: [
                [sequelize.fn('MAX', sequelize.col('servedNow')), 'latestServedTime'],
                'id',
                'code',
                'serviceId',
                'isServed',
                'counterId',
            ],
            group: ['counterId'],
            order: [[sequelize.fn('MAX', sequelize.col('servedNow')), 'DESC']],
        });
        expect(tickets).toEqual(mockTickets);
    });
});
