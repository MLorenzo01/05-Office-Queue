import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Navbar, Nav, Button } from 'react-bootstrap';
import { getServices } from '../API/API.mjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'; // Importa Link e useNavigate

function Customerpage() {
    const [service, setService] = useState([]);
    const navigate = useNavigate(); // Inizializza useNavigate

    // Funzione per recuperare i servizi dall'API
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesData = await getServices();
                setService(servicesData);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    return (
        <>
            {/* Contenuto principale */}
            <h1 className="text-center display-4 mb-5"> Welcome to the Customer Page </h1>
            <Row className="w-100 justify-content-center">
                {service.length > 0 ? (
                    service.map((service) => (
                        <Col key={service.id} sm={12} md={6} lg={4} className="mb-4 d-flex justify-content-center">
                            <Card
                                className="shadow-sm text-center"
                                style={{ width: '18rem', transition: 'transform 0.2s ease-in-out' }}
                                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                            >
                                <Card.Body>
                                    <Card.Title>{service.name}</Card.Title>
                                    <Card.Text>{service.estimatedTime} minutes</Card.Text>
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
