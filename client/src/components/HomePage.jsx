import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router";

function Homepage() {
    const navigate = useNavigate();

    return (
        <Container className="mt-5 text-center">
            <h1 className="display-4">Welcome to the Post Office</h1>
            <Row className="mt-4 justify-content-center">
                <Col md={4} className="mb-3"> {/* Puoi regolare le dimensioni del Col */}
                    <Button variant="light" className="w-100 border btn-lg" // btn-lg per pulsanti più grandi
                        onClick={() => navigate('/customer')}>Customer page</Button>
                </Col>
                <Col md={4} className="mb-3">
                    <Button variant="light" className="w-100 border btn-lg"
                        onClick={() => navigate('/officer')}>Officer page</Button>
                </Col>
                <Col md={4} className="mb-3">
                    <Button variant="light" className="w-100 border btn-lg"
                        onClick={() => navigate('/admin')}>Admin page</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Homepage;
