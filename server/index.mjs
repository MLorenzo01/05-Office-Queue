import express from "express";
import morgan from "morgan";
import cors from "cors";
import sequelize from "./db.mjs";
import populateDatabase from "./populateDB.mjs";
import { getServices } from "./services/serviceServices.mjs";
import { createTicketForService } from "./services/ticketServices.mjs";

const app = express();
const port = 3001;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("images"));

// Set up and enable CORS
const corsOptions = {
    origin: "http://localhost:5173",
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

// POST route for creating a new ticket
app.post("/api/tickets", async (req, res) => {
    try {
        const { serviceId } = req.body;

        if (!serviceId) {
            return res.status(400).json({ message: "Service ID is required" });
        }

        const newTicket = await createTicketForService(serviceId);

        if (!newTicket) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(201).json(newTicket); // 201 Created
    } catch (error) {
        console.error("Error creating ticket:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`API server started at http://localhost:${port}`);
});

async function createTicketInDatabase(serviceId, userId) {
    // Your logic to create a ticket in the database
}
