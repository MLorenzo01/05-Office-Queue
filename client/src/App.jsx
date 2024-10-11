import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Homepage from "./components/HomePage";
import NotFound from "./components/NotFoundComponent";
import CustomerPage from "./components/CustomerPage";
import OfficerPage from "./components/OfficerPage";
import AdminPage from "./components/AdminPage";
import TicketDetails from "./components/TicketDetails";
import "./App.css";

function App() {
    return (
        <>
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

                    {/* Ticket details route */}
                    <Route
                        path="tickets/:ticketId"
                        element={<TicketDetails />}
                    />

                    {/* Catch-all route for undefined paths */}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
