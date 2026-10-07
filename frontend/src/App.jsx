import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import EnquiryDetails from "./pages/EnquiryDetails";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Login */}
                <Route
                    path="/"
                    element={<AdminLogin />}
                />

                <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                />

                {/* Public contact page */}
                <Route
                    path="/contact"
                    element={<Contact />}
                />

                {/* Protected admin routes */}
                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/admin"
                        element={<AdminDashboard />}
                    />

                    <Route
                        path="/admin/enquiries/:id"
                        element={<EnquiryDetails />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;