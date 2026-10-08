import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { lazy, Suspense } from "react";

import ProtectedRoute from "./components/ProtectedRoute";

// Keep login/contact lightweight and load them immediately
import AdminLogin from "./pages/AdminLogin";
import Contact from "./pages/Contact";

// Lazy load admin pages
const AdminDashboard = lazy(
    () => import("./pages/AdminDashboard")
);

const EnquiryDetails = lazy(
    () => import("./pages/EnquiryDetails")
);

function PageLoader() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            Loading...
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
                <Routes>

                    {/* Login */}
                    {/* <Route
                        path="/"
                        element={<AdminLogin />}
                    /> */}

                    <Route
                        path="/admin/login"
                        element={<AdminLogin />}
                    />

                    {/* Public contact page */}
                    <Route
                        path="/"
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
            </Suspense>
        </BrowserRouter>
    );
}

export default App;