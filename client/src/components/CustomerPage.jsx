import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
//import { getServices, getCounters, takeTicket } from '../API/API.mjs';
import API from '../API/API.mjs';// API per i servizi
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Customerpage() {
    const [counters, setCounters] = useState([]);
    const [services, setServices] = useState([]); // Stato per i servizi
    const navigate = useNavigate();

    // Funzione per recuperare i counters dall'API
    useEffect(() => {
        const fetchCounters = async () => {
            try {
                const countersData = await API.getCounters();
                setCounters(countersData);
            } catch (error) {
                console.error('Error fetching counters:', error);
            }
        };

        const fetchServices = async () => {
            try {
                const servicesData = await API.getServices();
                setServices(servicesData);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchCounters();
        fetchServices();
    }, []);

    const handleCardClick = async (serviceId) => {
        try {
            const ticket = await API.takeTicket(serviceId, 1);
            console.log('Ticket taken:', ticket);

            navigate('/queueList');
        } catch (error) {
            console.error('Error taking ticket:', error);
        }
    };

    return (
        <>
            <h1 className="text-center display-4 mb-5"> Welcome to the Customer Page </h1>
            <Row className="w-100 justify-content-center">
                {counters.length > 0 && services.length > 0 ? (
                    counters.map((counter, index) => (
                        <Col key={counter.id} sm={12} md={6} lg={4} className="mb-4 d-flex justify-content-center">
                            <Card
                                className="shadow-sm text-center"
                                style={{ width: '18rem', transition: 'transform 0.2s ease-in-out' }}
                                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                                onClick={() => handleCardClick(counter.id, services[index]?.id)}
                            >
                                <Card.Body>
                                    <Card.Title>Service: {services[index]?.name || 'N/A'}</Card.Title>
                                    <Card.Text>Estimated Time: {services[index]?.estimatedTime} minutes</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p>No counters or services available</p>
                    </Col>
                )}
            </Row>
        </>
    );
}

export default Customerpage;
