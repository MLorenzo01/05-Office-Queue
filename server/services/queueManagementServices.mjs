import QRCode from "qrcode";
import ticketDao from "../dao/ticketDao.mjs";
import serviceDao from "../dao/serviceDao.mjs";
import counterDao from "../dao/counterDao.mjs";

export const FRONT_END_URL = "localhost:5173";

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

export const getTicket = async (ticketId) => {
    try {
        const ticket = await ticketDao.getTicketById(ticketId);
        return ticket;
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
