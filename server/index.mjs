import express from "express";
import morgan from "morgan";
import cors from "cors";
import sequelize from "./db.mjs";
import populateDatabase from "./populateDB.mjs";
import {
    getService,
    getServices,
    createTicketForService,
    getCounters,
    getTicket,
    FRONT_END_URL,
} from "./services/queueManagementServices.mjs";

const app = express();
const port = 3001;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("images"));

// Set up and enable CORS
const corsOptions = {
    origin: `http://${FRONT_END_URL}`,
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(cors(corsOptions));

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
        console.error("Error fetching ticket:", error);
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
        console.error("Error fetching counters:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`API server started at http://localhost:${port}`);
});
