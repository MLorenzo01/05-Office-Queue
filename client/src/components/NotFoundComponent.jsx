import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <Container className="mt-5 text-center">
            <h1 className="display-4">Pagina non trovata</h1>
            <p className="lead">La pagina che stai cercando non esiste.</p>
            <Link to="/">
                <Button variant="primary" size="lg">Torna alla Home</Button>
            </Link>
        </Container>
    );
}

export default NotFound;
