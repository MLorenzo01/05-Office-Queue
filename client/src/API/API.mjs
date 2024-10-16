const baseURL = "http://localhost:3001";

// ----------------- SERVICES ----------------- //

// Get all the available services
const getServices = async () => {
    const response = await fetch(`${baseURL}/api/services`);
    if (response.ok) {
        const services = await response.json();
        return services;
    } else {
        const errDetails = await response.text();
        throw errDetails;
    }
};

//get the service for a specific serviceId
const getService = async (serviceId) => {
    const response = await fetch(`${baseURL}/api/services/${serviceId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const service = await response.json();
        return service;
    } else {
        const errDetails = await response.text();
        throw errDetails;
    }
};

// ----------------- TICKETS ----------------- //

// Get the new tickets for a specific service
const takeTicket = async (serviceId) => {
    const response = await fetch(`${baseURL}/api/tickets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ serviceId }),
    });
    if (response.ok) {
        const ticket = await response.json();
        return ticket;
    } else {
        const errDetails = await response.text();
        throw errDetails;
    }
};

//get the ticket for a specific ticketId
const getTicket = async (ticketId) => {
    const response = await fetch(`${baseURL}/api/tickets/${ticketId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const ticket = await response.json();
        return ticket;
    } else {
        const errDetails = await response.text();
        throw errDetails;
    }
};

// Take the waiting time for a specific ticket
const takeTime = async (ticketId) => {
    const response = await fetch(`${baseURL}/api/waiting-time/${ticketId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const time = await response.json();
        return time;
    } else {
        const errDetails = await response.text();
        throw errDetails;
    }
};

// GET all the tickets with isServed=true
const getServedTickets = async () => {
    const response = await fetch(`${baseURL}/api/all-served-tickets`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const tickets = await response.json();
        return tickets;
    } else {
        const errDetails = await response.text();
        throw errDetails;
    }
}


// GET that returns only one result for counter
const getServedTicketsByCounter = async () => {
    const response = await fetch(`${baseURL}/api/counter-served-tickets`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const tickets = await response.json();
        return tickets;
    } else {
        const errDetails = await response.text();
        throw errDetails;
    }
}

// ----------------- CONFIGURATION ----------------- //

// Configure the service with the number of counters
const configureService = async (serviceId, counterId) => {
    const response = await fetch(`${baseURL}/api/counters/config`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ counterId, serviceId }),
    });
    if (response.ok) {
        const service = await response.json();
        return service;
    } else {
        const errDetails = await response.text();
        throw errDetails;
    }
};

// ----------------- STATS ----------------- //

// Get the stats for all the services
const getStats = async () => {
    const response = await fetch(`${baseURL}/api/stats`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const stats = await response.json();
        return stats;
    } else {
        const errDetails = await response.text();
        throw errDetails;
    }
};

// See all the stats for a specific service
const getServiceStats = async (serviceId) => {
    const response = await fetch(`${baseURL}/api/stats/${serviceId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const stats = await response.json();
        return stats;
    } else {
        const errDetails = await response.text();
        throw errDetails;
    }
};

// ----------------- COUNTERS ----------------- //

const getCounters = async () => {
    const response = await fetch(`${baseURL}/api/counters`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const counters = await response.json();
        return counters;
    } else {
        const errDetails = await response.text();
        throw errDetails;
    }
};

const getAvailablesCounters = async () => {
    const response = await fetch(`${baseURL}/api/availables-counters`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const counters = await response.json();
        return counters;
    } else {
        const errDetails = await response.text();
        throw errDetails;
    }
};

const counterOccupied = async (counterId) => {
    const response = await fetch(
        `${baseURL}/api/counters/${counterId}/occupy`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (response.ok) {
        const updatedCounter = await response.json();
        return updatedCounter;
    } else {
        const errDetails = await response.text();
        throw errDetails;
    }
};

const disconnectCounter = async (counterId) => {
    const response = await fetch(
        `${baseURL}/api/counters/${counterId}/disconnect`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (response.ok) {
        const updatedCounter = await response.json();
        return updatedCounter; // Returns the updated counter
    } else {
        const errDetails = await response.text();
        throw new Error(errDetails);
    }
};

const getNextCustomerForCounter = async (counterId) => {
    const response = await fetch(
        `${baseURL}/api/counters/${counterId}/next-customer`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (response.ok) {
        const ticket = await response.json();
        return ticket;
    } else {
        const errDetails = await response.text();
        throw new Error(errDetails);
    }
}

const API = {
    getServices,
    getService,
    getTicket,
    takeTicket,
    takeTime,
    getServedTickets,
    configureService,
    getStats,
    getServiceStats,
    getCounters,
    getAvailablesCounters,
    counterOccupied,
    disconnectCounter,
    getNextCustomerForCounter
};

export default API;
