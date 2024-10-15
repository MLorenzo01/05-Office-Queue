import Counter from "../models/counter.mjs";
import Service from "../models/service.mjs";

class CounterDao {

    // Method to fetch all availables counters
    async getAvailablesCounters() {
        try {
            const counters = await Counter.findAll(
                {
                    where: { isOccupied: false }
                }
            );
            return counters;
        } catch (error) {
            throw error;
        }
    }

    // Method to fetch all counters
    async getAllCounters() {
        try {
            const counters = await Counter.findAll();
            return counters;
        } catch (error) {
            throw error;
        }
    }

    // Method for updating the isOccupied attribute of a counter
    async updateIsOccupiedCounter(counterId, isOccupied) {
            try {
                const counter = await Counter.findByPk(counterId);
            
            if (!counter) {
                return null; // If the counter is not found, returns null
            }

            const operation = await Counter.update(
                { isOccupied: isOccupied },
                { 
                    where: {id: counterId},
                    returning: true // Returns the updated record
                }
            );
           
            // Returns the updated counter 
            return ((await Counter.findByPk(counterId)).dataValues); //ex: { id: 1, number: 1, isOccupied: true }
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