import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./routes/protectedroutes";
import LandingPage from "./pages/landing";
import Navbar from "./components/navbar";
import Layout from "./components/Layout";
import { GlobalProvider } from "./context/globalProvider";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Layout children={<LandingPage />} />} />
          <Route path="/login" element={<Layout children={<Login />} />} />
          <Route path="/signup" element={<Layout children={<Signup />} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
