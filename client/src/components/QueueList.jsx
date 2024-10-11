import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { getServices } from '../API/API.mjs';
import 'bootstrap/dist/css/bootstrap.min.css';

function QueueList() {
    const [services, setServices] = useState([]);

    // Funzione per recuperare i servizi dall'API
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesData = await getServices();
                setServices(servicesData);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    // Definizione dei counter predefiniti
    const counters = [
        { id: 1, service: '', estimatedTime: 10 }, // Placeholder per il servizio
        { id: 2, service: '', estimatedTime: 15 },
        { id: 3, service: '', estimatedTime: 5 }
    ];

    // Associa i servizi agli slot dei counter
    services.forEach((service, index) => {
        if (index < counters.length) {
            counters[index].service = service.name || 'N/A'; // Assegna il nome del servizio al counter
            counters[index].estimatedTime = service.estimatedTime || counters[index].estimatedTime; // Assegna il tempo stimato se presente
        }
    });

    return (
        <Container className="mt-5">
            <h1 className="text-center display-4 mb-5">Welcome to the Queue List</h1>
            <Row className="w-100 justify-content-center">
                {/* Mappa i counters con i servizi associati */}
                {counters.map((counter) => (
                    <Col key={counter.id} sm={12} md={6} className="mb-4 d-flex justify-content-center">
                        <Card className="shadow-sm text-center" style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Counter {counter.id}</Card.Title>
                                <Card.Text>
                                    Service: {counter.service || 'N/A'}<br />
                                    Estimated Time: {counter.estimatedTime} minutes
                                </Card.Text>
                                {/* Countdown */}
                                <CountdownTimer initialMinutes={counter.estimatedTime} />
                                <Card.Text>
                                    Now serving:
                                </Card.Text>
                                {/* Numero di servizio attuale */}
                                <Card.Text className="mt-3" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                                    {counter.id}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

// Componente CountdownTimer per il countdown
const CountdownTimer = ({ initialMinutes }) => {
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // Converti i minuti in secondi

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => Math.max(prevTime - 1, 0)); // Decrementa il tempo rimanente
        }, 1000);

        return () => clearInterval(timer); // Pulisci l'intervallo all'unmount
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`; // Formatta come MM:SS
    };

    return <div>{formatTime(timeLeft)}</div>;
};

export default QueueList;
