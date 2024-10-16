import express from "express";
import morgan from "morgan";
import cors from "cors";
import sequelize from "./db.mjs";
import populateDatabase from "./populateDB.mjs";
import {
    getService,
    getServices,
    createTicketForService,
    getServedTickets,
    getServedTicketsByCounter,
    getCounters,
    getAvailablesCounters,
    updateOccupiedCounter,
    updateDisconnectedCounter,
    getTicket,
    getNextCustomerForCounter,
} from "./services/queueManagementServices.mjs";

const app = express();
const port = 3001;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("images"));

app.use(cors());

// Sync database and create tables with associations
await sequelize.sync({ force: true }).then(() => {
    console.log("Database & tables created!");
    populateDatabase();
});

// GET route for fetching available services
app.get("/api/services", async (req, res) => {
    try {
        const services = await getServices();
        res.json(services);
    } catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//GET route for fetching a specific service
app.get("/api/services/:serviceId", async (req, res) => {
    try {
        const { serviceId } = req.params;

        if (!serviceId) {
            return res.status(400).json({ message: "Service ID is required" });
        }

        const service = await getService(serviceId);

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json(service); // 200 OK
    } catch (error) {
        console.error("Error fetching service:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST route for creating a new ticket
app.post("/api/tickets", async (req, res) => {
    try {
        const { serviceId } = req.body;

        if (!serviceId) {
            return res.status(400).json({ message: "Service ID is required" });
        }

        const { ticket, qrCodeUrl } = await createTicketForService(serviceId);

        if (!ticket) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(201).json({ ticket, qrCodeUrl }); // 201 Created
    } catch (error) {
        console.error("Error creating ticket:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to get all the served tickets
app.get("/api/all-served-tickets", async (req, res) => {
    try {

        const tickets = await getServedTickets();

        if (!tickets || tickets.length === 0) {
            return res.status(404).json({ message: "No tickets found" });
        }

        res.status(200).json(tickets); // 200 OK
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET path that returns only one result for counter
app.get("/api/counter-served-tickets", async (req, res) => {
    try {
        const tickets = await getServedTicketsByCounter();

        if (!tickets || tickets.length === 0) {
            return res.status(404).json({ message: "No tickets found" });
        }

        res.status(200).json(tickets); // 200 OK
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to get the ticket details
app.get("/api/tickets/:ticketId", async (req, res) => {
    try {
        const { ticketId } = req.params;

        if (!ticketId) {
            return res.status(400).json({ message: "Ticket ID is required" });
        }

        const ticket = await getTicket(ticketId);

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json(ticket); // 200 OK
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to get all the counters
app.get("/api/counters", async (req, res) => {
    try {
        const counters = await getCounters();

        if (!counters || counters.length === 0) {
            return res.status(404).json({ message: "No counters found" });
        }

        res.status(200).json(counters); // 200 OK
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to get all the availables counters
app.get("/api/availables-counters", async (req, res) => {
    try {
        const counters = await getAvailablesCounters();

        if (!counters || counters.length === 0) {
            return res.status(404).json({ message: "No counters found" });
        }

        res.status(200).json(counters); // 200 OK
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT route for update isOccupied attribute of a counter
app.put("/api/counters/:id/occupy", async (req, res) => {
    try {
        const counterId = req.params.id;

        if (!counterId) {
            return res.status(400).json({ message: "Counter ID is required" });
        }

        const counter = await updateOccupiedCounter(counterId);

        if (!counter) {
            return res.status(404).json({ message: "Counter not found" });
        }

        res.status(200).json(counter);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/api/counters/:id/disconnect", async (req, res) => {
    try {
        const counterId = req.params.id;

        if (!counterId) {
            return res.status(400).json({ message: "Counter ID is required" });
        }

        const counter = await updateDisconnectedCounter(counterId);

        if (!counter) {
            return res.status(404).json({ message: "Counter not found" });
        }

        res.status(200).json(counter);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/counters/:id/next-customer", async (req, res) => {
    // Implement this route
    try {
        const { id } = req.params;
        const ticketNextCustomer = await getNextCustomerForCounter(id);
        if (!ticketNextCustomer) {
            return res.status(404).json({ message: "No customer found" });
        }
        res.status(200).json(ticketNextCustomer);
    } catch (error) {
        console.error("Error fetching next customer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`API server started at http://localhost:${port}`);
});
