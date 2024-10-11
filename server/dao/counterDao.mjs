import Counter from "../models/counter.mjs";

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
}

export default new CounterDao();