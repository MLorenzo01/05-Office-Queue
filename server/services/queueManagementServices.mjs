import QRCode from "qrcode";
import ticketDao from "../dao/ticketDao.mjs";
import serviceDao from "../dao/serviceDao.mjs";
import counterDao from "../dao/counterDao.mjs";

export const FRONT_END_URL = "192.168.219.51:5173";

// Method to retrieve all services by interacting with the DAO
export const getServices = async () => {
    try {
        const services = await serviceDao.getAllServices();
        return services;
    } catch (error) {
        throw error;
    }
};

// Method to retrieve a specific service
export const getService = async (serviceId) => {
    try {
        const service = await serviceDao.getServiceById(serviceId);
        return service;
    } catch (error) {
        throw error;
    }
};

export const createTicketForService = async (serviceId) => {
    try {
        // check if service exists
        const service = await serviceDao.getServiceById(serviceId);
        if (!service) {
            return { ticket: null, qrCodeUrl: null }; // Service not found
        }

        // get today last ticket for the service
        const lastTicket = await ticketDao.getTodayLastTicket();
        const nextCode = lastTicket ? lastTicket.code + 1 : 1; // increment the last ticket code or start from 1

        // create new ticket
        const ticketData = {
            code: nextCode,
            serviceId,
            createdAt: new Date(),
        };

        const ticket = await ticketDao.createTicket(ticketData);
        const qrCodeUrl = await QRCode.toDataURL(
            `http://${FRONT_END_URL}/tickets/${ticket.id}`
        ); // await QRCode.toDataURL(`Ticket code: ${ticket.code}`);
        return { ticket, qrCodeUrl };
    } catch (error) {
        throw error;
    }
};

// Method to retrieve all served tickets by interacting with the DAO
export const getServedTickets = async () => {
    try {
        const tickets = await ticketDao.getServedTickets();
        return tickets;
    } catch (error) {
        throw error;
    }
};

export const getServedTicketsByCounter = async () => {
    try {
        const tickets = await ticketDao.getLatestServedTicketsByCounter();
        return tickets;
    } catch (error) {
        throw error;
    }
};

export const getTicket = async (ticketId) => {
    try {
        const ticket = await ticketDao.getTicketById(ticketId);
        return ticket;
    } catch (error) {
        throw error;
    }
};

// Service function to obtain the status of the counters with the last ticket
export const getCountersWithLatestTicket = async () => {
    try {
        const countersStatus = await counterDao.getCountersWithLatestTicket();
        return countersStatus;
    } catch (error) {
        throw error;
    }
};

// Method to retrieve all counters by interacting with the DAO
export const getCounters = async () => {
    try {
        const counters = await counterDao.getAllCounters();
        return counters;
    } catch (error) {
        throw error;
    }
};

// Method to retrieve all availables counters by interacting with the DAO
export const getAvailablesCounters = async () => {
    try {
        const counters = await counterDao.getAvailablesCounters();
        return counters;
    } catch (error) {
        throw error;
    }
};

// Method for updating (true) the isOccupied attribute of a counter
export const updateOccupiedCounter = async (counterId) => {
    try {
        const response = await counterDao.updateIsOccupiedCounter(
            counterId,
            true
        );
        return response;
    } catch (error) {
        throw error;
    }
};

// Method for updating (false) the isOccupied attribute of a counter
export const updateDisconnectedCounter = async (counterId) => {
    try {
        const counter = await counterDao.updateIsOccupiedCounter(
            counterId,
            false
        ); // Also pass false to update isOccupied
        return counter;
    } catch (error) {
        throw error;
    }
};

// Method to get the next customer for a counter
export const getNextCustomerForCounter = async (counterId) => {
    try {
        //const services = await counterDao.getServiceByCounterId(counterId);
        const services = await ticketDao.getServiceWithMaxEstimatedTime(
            counterId
        );
        if (!services) {
            return null;
        }
        for (let i = 0; i < services.length; i++) {
            const service = services[i];
            const ticket = await ticketDao.takeTicketToServed(
                service.serviceId,
                counterId
            );
            if (ticket) {
                return ticket;
            }
        }
        return null;
    } catch (error) {
        throw error;
    }
};
