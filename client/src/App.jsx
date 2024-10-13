import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Homepage from './components/HomePage';
import NotFound from './components/NotFoundComponent';
import CustomerPage from './components/CustomerPage';
import OfficerPage from './components/OfficerPage';
import AdminPage from './components/AdminPage';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import QueueList from './components/QueueList';

function App() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100"> {/* Flexbox container */}
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ cursor: 'pointer' }}>
            Home
          </Navbar.Brand>
          <Navbar.Brand as={Link} to="/QueueList" style={{ cursor: 'pointer' }}>
            Queue Times
          </Navbar.Brand>
          <Nav className="ml-auto"> {/* Aligns the buttons to the right */}
            <Button variant="outline-primary" onClick={() => navigate('/admin')}>
              Admin Page
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Outlet />}>
          {/* Homepage */}
          <Route index element={<Homepage />} />

          {/* Customer page route */}
          <Route path="/customer" element={<CustomerPage />} />

          {/* Officer page route */}
          <Route path="officer" element={<OfficerPage />} />

          {/* Admin page route */}
          <Route path="admin" element={<AdminPage />} />

          {/* Queue list page route */}
          <Route path="QueueList" element={<QueueList />} />

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <Footer className="mt-auto" /> {/* Footer at the bottom */}
    </div>
  );
}

export default App;
