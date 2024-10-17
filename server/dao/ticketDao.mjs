import Ticket from "../models/ticket.mjs";
import Counter from "../models/counter.mjs";
import CounterService from "../models/counterService.mjs";
import Service from "../models/service.mjs";
import { Op } from "sequelize";
import sequelize from "../db.mjs";

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
    
    //Take the ticket to served gived the serviceId
    async takeTicketToServed(serviceId, counterId) {
        try {
            const ticket = await Ticket.findOne({
                where: {
                    serviceId,
                    isServed: false,
                },
                order: [["createdAt", "ASC"]],
            });
            if (!ticket) {
                return null;
            }

            ticket.isServed = true;
            ticket.servedNow = new Date();
            ticket.counterId = counterId;
            await ticket.save();
            return ticket;
        } catch (error) {
            throw error;
        }
    }

    // Retrive the services related to the counter
    async getServiceByCounterId(counterId) {
        try {
            const services = await CounterService.findAll({
                where: {
                    counterId,
                },
            });
            return services;
        } catch (error) {
            throw error;
        }
    }

    // retrieve the service with the sum of the estimated time related to the number of tickets for that service
    async getServiceWithMaxEstimatedTime(counterId) {
        try{
            const services = await this.getServiceByCounterId(counterId);
            if(!services){
                return null;
            }
            const serviceIds = services.map((service) => service.serviceId);
            const serviceId = serviceIds[0];
            const AllService = await Ticket.findAll({
                where: {
                    serviceId,
                },
                attributes: [
                    "serviceId",
                    [sequelize.fn("SUM", sequelize.col("Service.estimatedTime")), "totalEstimatedTime"],
                ],
                include: {
                    model: Service,
                    attributes: [],
                },
                group: ["serviceId"],
                order: [[sequelize.literal("totalEstimatedTime"), "DESC"]],
            });
            if(AllService){
                console.log("No services found for the counter: ", counterId);
                return null;
            }
            return AllService;
        }catch(error){
            throw error;
        }
    }

    async getNextCustomerTicket(serviceId) {
        try {
            const nextTicket = await Ticket.findOne({
                where: {
                    serviceId,
                    isServed: false,
                },
                order: [["createdAt", "ASC"]],
            });
            return nextTicket;
        } catch (error) {
            throw error;
        }
    }

    async getServedTickets() {
        try {
            const tickets = await Ticket.findAll({
                where: { isServed: true },
                order: [['servedNow', 'DESC']], // Sort by newest ticket first
            });
            return tickets;
        } catch (error) {
            throw error;
        }
    }

    async getLatestServedTicketsByCounter() {
        try {
            const tickets = await Ticket.findAll({
                where: { isServed: true }, // Filter only served tickets
                attributes: [
                    [sequelize.fn('MAX', sequelize.col('servedNow')), 'latestServedTime'], // Get the latest time for each counter
                    'id', 'code', 'serviceId', 'isServed', 'counterId'
                ],
                group: ['counterId'], // Group the results by counterId, so that there is only one ticket for each counter
                order: [[sequelize.fn('MAX', sequelize.col('servedNow')), 'DESC']] // Sort by latest time servedNow
            });
            return tickets;
        } catch (error) {
            throw error;
        }
    }    
}

export default new TicketDao();
