import Counter from "../models/counter.mjs";
import Service from "../models/service.mjs";
import Ticket from "../models/ticket.mjs";

class CounterDao {
    // Method to fetch all availables counters
    async getAvailablesCounters() {
        try {
            const counters = await Counter.findAll({
                where: { isOccupied: false },
            });
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
                    where: { id: counterId },
                    returning: true, // Returns the updated record
                }
            );

            // Returns the updated counter
            return (await Counter.findByPk(counterId)).dataValues; //ex: { id: 1, number: 1, isOccupied: true }
        } catch (error) {
            throw error;
        }
    }
    /*
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
    */
    async getCountersWithLatestTicket() {
        try {
            // First get all counters
            const counters = await Counter.findAll();

            // Then for each counter, get the latest ticket served (if available)
            const countersWithLatestTickets = await Promise.all(
                counters.map(async (counter) => {
                    const latestTicket = await Ticket.findOne({
                        where: {
                            counterID: counter.id,
                            isServed: true,
                        },
                        include: Service,
                        order: [["servedNow", "DESC"]], // Get the latest ticket
                        attributes: [
                            "id",
                            "code",
                            "serviceId",
                            "counterID",
                            "servedNow",
                        ],
                    });

                    return {
                        ...counter.get({ plain: true }),
                        latestTicket,
                    };
                })
            );

            return countersWithLatestTickets;
        } catch (error) {
            throw error;
        }
    }
}

export default new CounterDao();
