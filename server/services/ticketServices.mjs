import ticketDao from "../dao/ticketDao.mjs";
import serviceDao from "../dao/serviceDao.mjs";

export const createTicketForService = async (serviceId) => {
    try {
        // check if service exists
        const service = await serviceDao.getServiceById(serviceId);
        if (!service) {
            return null; // Service not found
        }

        // get today last ticket for the service
        const lastTicket = await ticketDao.getTodayLastTicket();
        const nextCode = lastTicket ? lastTicket.code + 1 : 1; // increment the last ticket code or start from 1

        // create new ticket
        const newTicketData = {
            code: nextCode,
            serviceId,
            createdAt: new Date(),
        };

        const newTicket = await ticketDao.createTicket(newTicketData);
        return newTicket;
    } catch (error) {
        throw error;
    }
};
