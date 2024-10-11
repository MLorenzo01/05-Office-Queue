const baseURL = "http://localhost:3001";

// ----------------- SERVICES ----------------- //

// Get all the available services
export const getServices = async () => {
  const response = await fetch(`${baseURL}/api/services`);
  if(response.ok){
    const services = await response.json();
    return services;
} else {
    const errDetails = await response.text();
    throw errDetails;
}
};

// ----------------- TICKETS ----------------- //

// Get the new tickets for a specific service
export const takeTicket = async (serviceId, userId) => {
  const response = await fetch(`${baseURL}/api/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({serviceId, userId}),
  });
  if(response.ok){
    const ticket = await response.json();
    return ticket;
} else {
    const errDetails = await response.text();
    throw errDetails;
}
}

// Teke the waiting time for a specific ticket
export const takeTime = async (ticketId) => {
  const response = await fetch(`${baseURL}/api/waiting-time/${ticketId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if(response.ok){
    const time = await response.json();
    return time;
} else {
    const errDetails = await response.text();
    throw errDetails;
}
}

// ----------------- CONFIGURATION ----------------- //

// Configure the service with the number of counters
export const configureService = async (serviceId, counterId) => {
  const response = await fetch(`${baseURL}/api/counters/config`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({counterId, serviceId}),
  });
  if(response.ok){
    const service = await response.json();
    return service;
} else {
    const errDetails = await response.text();
    throw errDetails;
}
}

// ----------------- STATS ----------------- //

// Get the stats for all the services
export const getStats = async () => {
  const response = await fetch(`${baseURL}/api/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if(response.ok){
    const stats = await response.json();
    return stats;
} else {
    const errDetails = await response.text();
    throw errDetails;
}
}

// See all the stats for a specific service
export const getServiceStats = async (serviceId) => {
  const response = await fetch(`${baseURL}/api/stats/${serviceId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if(response.ok){
    const stats = await response.json();
    return stats;
} else {
    const errDetails = await response.text();
    throw errDetails;
}
}

// ----------------- COUNTERS ----------------- //

export const getCounters = async () => {
  const response = await fetch(`${baseURL}/api/counters`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if(response.ok){
    const counters = await response.json();
    return counters;
} else {
    const errDetails = await response.text();
    throw errDetails;
}
}