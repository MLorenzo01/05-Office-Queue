import React, { useState, useEffect } from 'react';
import { Container, Button, Spinner, Col, Row } from 'react-bootstrap';
import API from '../API/API.mjs';

function Officerpage() {

    const [selectedCounter, setSelectedCounter] = useState(null);
    const [clientNumber, setClientNumber] = useState(0);
    const [counters, setCounters] = useState([]); // The available counters
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to call the API and get counters
    const fetchAvailablesCounters = async () => {
        try {
            const response = await API.getAvailablesCounters();
            setCounters(response); // The answer is an array of counters
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
            ) : !selectedCounter ? (
                <div>
                    <h2>Select the counter</h2>
                    {counters.map((counter) => (
                        <Button
                            key={counter.id}
                            onClick={() => handleSelectCounter(counter)}
                            className="m-2"
                            variant="primary"
                        >
                            Counter {counter.number}
                        </Button>
                    ))}
                </div>
            ) : (
                !loading && selectedCounter && (
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
                )
            )}
        </Container>
    );
}

export default Officerpage;
