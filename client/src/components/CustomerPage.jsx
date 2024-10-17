import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import API from "../API/API.mjs"; // API for services
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Customerpage() {
    const [services, setServices] = useState([]); // State for services
    const navigate = useNavigate();

    // Function to fetch services from the API
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesData = await API.getServices();
                setServices(servicesData);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        fetchServices();
    }, []);

    const handleCardClick = async (serviceId) => {
        try {
            const ticket = await API.takeTicket(serviceId);
            console.log("Ticket taken:", ticket);

            // Navigate to TicketDetails, passing ticket id and QR code URL
            navigate(`/tickets/${ticket.ticket.id}`, {
                state: { qrCodeUrl: ticket.qrCodeUrl }, // Pass QR code URL in state
            });
        } catch (error) {
            console.error("Error taking ticket:", error);
        }
    };

    return (
        <>
            <h1 className="text-center display-4 mb-5">
                {" "}
                Welcome to the Customer Page{" "}
            </h1>
            <Row className="w-100 justify-content-center">
                {services.length > 0 ? (
                    services.map((service) => (
                        <Col
                            key={service.id}
                            sm={12}
                            md={6}
                            lg={4}
                            className="mb-4 d-flex justify-content-center"
                        >
                            <Card
                                className="shadow-sm text-center"
                                style={{
                                    width: "18rem",
                                    transition: "transform 0.2s ease-in-out",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.transform =
                                        "scale(1.05)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.transform =
                                        "scale(1)")
                                }
                                onClick={() => handleCardClick(service.id)}
                            >
                                <Card.Body>
                                    <Card.Title>
                                        Service: {service.name || "N/A"}
                                    </Card.Title>
                                    <Card.Text>
                                        Estimated Time: {service.estimatedTime}{" "}
                                        minutes
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p>No services available</p>
                    </Col>
                )}
            </Row>
        </>
    );
}

export default Customerpage;
