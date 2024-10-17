import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import API from "../API/API.mjs";
import "bootstrap/dist/css/bootstrap.min.css";

function QueueList() {
    const [counters, setCounters] = useState([]);

    useEffect(() => {
        const fetchCountersStatus = async () => {
            try {
                const countersStatus = await API.getCountersStatus();
                setCounters(countersStatus);
            } catch (error) {
                console.error("Error fetching counters status:", error);
            }
        };
        // fetch every 10 seconds
        const interval = setInterval(() => {
            fetchCountersStatus();
        }, 10000);
        fetchCountersStatus();

        return () => clearInterval(interval);
    }, []);

    return (
        <Container className="mt-5">
            <h1 className="text-center display-4 mb-5">
                Welcome to the Queue List
            </h1>
            <Row className="w-100 justify-content-center">
                {/* Mappa i counters con i servizi associati */}
                {counters.map((counter) => (
                    <Col
                        key={counter.id}
                        sm={12}
                        md={6}
                        className="mb-4 d-flex justify-content-center"
                    >
                        <Card
                            className="shadow-sm text-center"
                            style={{ width: "18rem" }}
                        >
                            <Card.Body>
                                <Card.Title>
                                    Counter {counter.number}
                                </Card.Title>
                                <Card.Text>
                                    Service:{" "}
                                    {counter.latestTicket
                                        ? counter.latestTicket.Service.name
                                        : "N/A"}
                                    <br />
                                    Estimated Time:{" "}
                                    {counter.latestTicket
                                        ? counter.latestTicket.Service
                                              .estimatedTime
                                        : "N/A"}{" "}
                                    minutes
                                </Card.Text>
                                <Card.Text>Now serving:</Card.Text>
                                {/* Numero di servizio attuale */}
                                <Card.Text
                                    className="mt-3"
                                    style={{
                                        fontSize: "2.5rem",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {counter.latestTicket
                                        ? counter.latestTicket.code
                                        : "No customer"}
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
