import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from "react-router";

function Homepage() {
    const navigate = useNavigate();

    return (
        <Container className="mt-5 text-center">
            <h1 className="display-4">Welcome to the HomePage</h1>
            <Button variant="primary" className="mt-3" 
            onClick={() => navigate('/customer')}>Customer page</Button>
            <Button variant="primary" className="mt-3" 
            onClick={() => navigate('/officer')}>Officer page</Button>
            <Button variant="primary" className="mt-3" 
            onClick={() => navigate('/admin')}>Admin page</Button>
        </Container>
    );
}

export default Homepage;
