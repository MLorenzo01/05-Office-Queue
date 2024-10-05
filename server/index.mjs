import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('images'));

// Set up and enable CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

// GET route for fetching available services
app.get('/api/services', async (req, res) => {
  try {
    const services = await getServicesFromDatabase();
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST route for creating a new ticket
app.post('/api/tickets', async (req, res) => {
  const { serviceId, userId } = req.body;

  // Validate input
  if (!serviceId || !userId) {
    return res.status(400).json({ error: 'serviceId and userId are required' });
  }

  try {
    const newTicket = await createTicketInDatabase(serviceId, userId);
    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API server started at http://localhost:${port}`);
});

// Example database functions (to be replaced with your actual implementations)
async function getServicesFromDatabase() {
  // Your logic to fetch services from the database
}

async function createTicketInDatabase(serviceId, userId) {
  // Your logic to create a ticket in the database
}
