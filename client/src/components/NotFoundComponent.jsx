import React from 'react';
import { Container, Button } from 'react-bootstrap';

function NotFound() {
    return (
        <Container className="mt-5 text-center">
            <h1 className="display-4">Page not found</h1>
            <p className="lead">The page you are looking for does not exist.</p>
        </Container>
    );
}

export default NotFound;