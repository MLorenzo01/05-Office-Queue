import React, { useState, useEffect } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
//import API.mjs;

function Officerpage() {

    const [selectedCounter, setSelectedCounter] = useState(null);
    const [clientNumber, setClientNumber] = useState(0);
    const [counters, setCounters] = useState([]); // The available counters
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to call the API and get counters
    const fetchCounters = async () => {
        try {
            const response = API.getCounters();
            const data = await response.json();
            setCounters(data); // The answer is an array of counters
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCounters();
    }, []);

    const handleSelectCounter = (counter) => {
        setSelectedCounter(counter);
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
                <div>
                    <h2>Counter selected: {selectedCounter.number}</h2>
                    <Button onClick={handleNextClient} variant="success">
                    Call the next customer
                    </Button>
                    <p className="mt-3">Current customer: {clientNumber}</p>
                </div>
            )}
        </Container>
    );
}

export default Officerpage;
