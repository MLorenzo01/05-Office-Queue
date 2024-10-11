import Ticket from "../models/ticket.mjs";
import { Op } from "sequelize";

class TicketDao {
    // Method to get a ticket by ID
    async getTicketById(ticketId) {
        try {
            const ticket = await Ticket.findByPk(ticketId);
            return ticket;
        } catch (error) {
            throw error;
        }
    }

    // Method to create a new ticket
    async createTicket(ticketData) {
        try {
            const newTicket = await Ticket.create(ticketData);
            return newTicket;
        } catch (error) {
            throw error;
        }
    }

    async getTodayLastTicket() {
        try {
            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);

            const lastTicket = await Ticket.findOne({
                where: {
                    createdAt: {
                        [Op.gte]: todayStart, // Greater than or equal to todayStart
                    },
                },
                order: [["code", "DESC"]],
            });
            return lastTicket;
        } catch (error) {
            throw error;
        }
    }
}

export default new TicketDao();
