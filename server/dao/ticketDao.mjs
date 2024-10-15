import Ticket from "../models/ticket.mjs";
import Counter from "../models/counter.mjs";
import CounterService from "../models/counterService.mjs";
import Service from "../models/service.mjs";
import { Op } from "sequelize";
import sequelize from "../db.mjs";

class TicketDao {

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
    async takeTicketToServed(serviceId) {
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
            const service = await Ticket.findOne({
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
            if(!service){
                console.log("No services found for the counter: ", counterId);
                return null;
            }
            return service;
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

    async setNextTicketToServed(ticketId) {
        try {
            const ticket = await Ticket.findByPk(ticketId);
            if (!ticket) {
                return null;
            }

            ticket.isServed = true;
            ticket.servedAt = new Date();
            await ticket.save();
            return ticket;
        } catch (error) {
            throw error;
        }
    }
}

export default new TicketDao();
