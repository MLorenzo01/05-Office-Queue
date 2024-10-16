import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner, Col, Row, Button } from 'react-bootstrap';
import API from '../API/API.mjs';

function Officerpage() {
    const [selectedCounter, setSelectedCounter] = useState(null);
    const [clientNumber, setClientNumber] = useState(0);
    const [counters, setCounters] = useState([]); // Available counters
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch available counters from the API
    const fetchAvailablesCounters = async () => {
        try {
            const response = await API.getAvailablesCounters();
            setCounters(response); // Set the received counters
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAvailablesCounters();
    }, []);

    const handleSelectCounter = async (counter) => {
        try {
            const updatedCounter = await API.counterOccupied(counter.id);
            if (updatedCounter) {
                setSelectedCounter(updatedCounter);
            }
        } catch (error) {
            setError(error);
        }
    };

    const disconnectCounter = async () => {
        if (selectedCounter) {
            try {
                // Call the API to set isOccupied to false
                await API.disconnectCounter(selectedCounter.id);
                // Reset the state of the selected counter
                setSelectedCounter(null); // Return to counter selection
            } catch (error) {
                setError(error);
            }
        }
    };

    const handleNextClient = () => {
        setClientNumber(clientNumber + 1);
    };

    return (
        <Container className="mt-5 text-center">
            <h1 className="display-4">Welcome to the OfficerPage</h1>
            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {/* Render counters only if no counter is selected */}
                    {!selectedCounter ? (
                        <Row className="w-100 justify-content-center">
                            {counters.map((counter) => (
                                <Col key={counter.id} sm={12} md={6} lg={4} className="mb-4 d-flex justify-content-center">
                                    <Card
                                        className="shadow-sm text-center"
                                        style={{
                                            width: '18rem',
                                            transition: 'transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out',
                                            cursor: 'pointer',
                                            backgroundColor: selectedCounter?.id === counter.id ? '#f8f9fa' : '#fff',
                                            borderColor: selectedCounter?.id === counter.id ? '#007bff' : '#dee2e6'
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = "scale(1.05)";
                                            e.currentTarget.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.2)";
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = "scale(1)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                        onClick={() => handleSelectCounter(counter)} // Select the counter
                                    >
                                        <Card.Body>
                                            <Card.Title>Counter {counter.number}</Card.Title>
                                            <Card.Text>
                                                {counter.isOccupied ? (
                                                    // No badge for occupied counters
                                                    <span></span>
                                                ) : (
                                                    <span className="badge bg-success">Available</span> // Only green badge for available counters
                                                )}
                                                <br />
                                                Click to select this counter
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        // Render selected counter details
                        <div>
                            <Row className="d-flex align-items-center justify-content-center mt-3">
                                <Col md="auto">
                                    <h2 className="mr-2">Counter selected: {selectedCounter.number}</h2>
                                </Col>
                                <Col md="auto">
                                    <Button onClick={disconnectCounter} variant="danger">
                                        Disconnect
                                    </Button>
                                </Col>
                            </Row>
                            <Row className="d-flex align-items-center justify-content-center mt-3">
                                <Col md="auto">
                                    <p className="mt-3">Current customer: {clientNumber}</p>
                                </Col>
                                <Col md="auto">
                                    <Button onClick={handleNextClient} variant="success">
                                        Call the next customer
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    )}
                </div>
            )}
        </Container>
    );
}

export default Officerpage;
