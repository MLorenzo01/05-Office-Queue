import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import { getTicket, getService } from '../API/API.mjs';

function TicketDetails() {
  const { ticketId } = useParams(); // Get the ticketId from the route
  const [ticket, setTicket] = useState(null);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicketAndService = async () => {
        try {
            const ticketData = await getTicket(ticketId); // Use the getTicket method
            setTicket(ticketData);

            // Fetch the service based on the ticket's serviceId
            if (ticketData && ticketData.serviceId) {
                const serviceData = await getService(ticketData.serviceId);
                setService(serviceData);
            }
            setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchTicketAndService();
  }, [ticketId]);

  return (
    <Container className="mt-5 text-center">
            <h1 className="display-4">This is your ticket :</h1>
            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <p>{error}</p>
            ) : ticket ? (
                <div>
                    <h2>Ticket</h2>
                    <p>Code: {ticket.code}</p>
                    <h2>Service</h2>
                    <p>Name: {service.name}</p>
                    <p>Estimated Time: {service.estimatedTime}</p>

                </div>
            ) : (
                <div>
                    <h2>No ticket found...</h2>
                </div>
            )}
        </Container>
    );
};

export default TicketDetails;
