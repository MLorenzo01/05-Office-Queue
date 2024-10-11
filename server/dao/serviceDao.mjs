import Service from "../models/service.mjs";

class ServiceDao {
    // Method to fetch all services
    async getAllServices() {
        try {
            const services = await Service.findAll();
            return services;
        } catch (error) {
            throw error;
        }
    }

    async getServiceById(id) {
        try {
            const service = await Service.findByPk(id);
            return service;
        } catch (error) {
            throw error;
        }
    }

    // You can add more methods here (e.g., to create, update, delete services)
}

export default new ServiceDao();
