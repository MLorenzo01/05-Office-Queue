import Counter from "../models/counter.mjs";
import Service from "../models/service.mjs";

class CounterDao {
    // Method to fetch all counters
    async getAllCounters() {
        try {
            const counters = await Counter.findAll();
            return counters;
        } catch (error) {
            throw error;
        }
    }

    async getServiceByCounterId(id) {
        try {
            const counter = await Counter.findByPk(id, {
                include: Service,
            });
            return counter ? counter.Services : null;
        } catch (error) {
            throw error;
        }
    }
}

export default new CounterDao();