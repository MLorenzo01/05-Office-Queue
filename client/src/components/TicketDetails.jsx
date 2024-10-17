import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import API from "../API/API.mjs";

function TicketDetails() {
    const { ticketId } = useParams(); // Get the ticketId from the route
    const location = useLocation(); // Get location for accessing state
    const [ticket, setTicket] = useState(null);
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTicketAndService = async () => {
            try {
                const ticketData = await API.getTicket(ticketId); // Use the getTicket method
                setTicket(ticketData);

                // Fetch the service based on the ticket's serviceId
                if (ticketData && ticketData.serviceId) {
                    const serviceData = await API.getService(
                        ticketData.serviceId
                    );
                    setService(serviceData);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching ticket:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchTicketAndService();
    }, [ticketId]);

    return (
        <Container className="text-center">
            {loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : error || !ticket ? (
                <h2>No ticket found...</h2>
            ) : (
                <>
                    <h1>Your ticket code is :</h1>
                    <p
                        className="display-1 m-4 fw-bold text-primary"
                        style={{ fontSize: "4rem" }}
                    >
                        {ticket.code}
                    </p>
                    <h2>You are waiting for :</h2>
                    <p className="display-4 m-4 fw-bold text-primary">
                        {service.name}
                    </p>

                    {/* Display the QR code image */}
                    {location.state && location.state.qrCodeUrl && (
                        <img
                            src={location.state.qrCodeUrl}
                            alt="QR Code"
                            className="my-4"
                            style={{ width: "200px", height: "200px" }}
                        />
                    )}

                    <h3 className="fst-italic">
                        Don't forget to check the screen to know when it's your
                        turn!
                    </h3>
                </>
            )}
        </Container>
    );
}

export default TicketDetails;
