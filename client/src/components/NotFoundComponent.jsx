import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <Container className="mt-5 text-center">
            <h1 className="display-4">Page not found</h1>
            <p className="lead">The page you're searching for does not exist.</p>
            <Link to="/">
                <Button variant="primary" size="lg">Back to Home</Button>
            </Link>
        </Container>
    );
}

export default NotFound;
