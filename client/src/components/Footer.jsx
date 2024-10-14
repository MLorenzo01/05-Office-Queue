// components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start mt-auto py-3">
            <Container>
                <Row>
                    <Col>
                        <p className="mb-0">© {new Date().getFullYear()} Post Office. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
