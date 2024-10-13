import Counter from "../models/counter.mjs";

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
            const updatedCounter = await Counter.findByIdAndUpdate(
                counterId,
                { isOccupied: isOccupied },
                { new: true } // Returns the updated document
            );
           
            console.log("Updated Counter:", updatedCounter);

            // Returns the updated counter (or null if not found)
            return updatedCounter;
        } catch (error) {
            throw error;
        }
    }
    
}

export default new CounterDao();