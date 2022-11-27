// styling
import "./App.css";

// components
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Contact from "./components/Contact/Contact";
import Demo from "./components/Demo/Demo";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// routing
import { Routes, Route, Navigate } from "react-router";

// misc
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <div className="app-div">
      <HelmetProvider>
        <Helmet>
          <script
            src="https://kit.fontawesome.com/13fdecaf2e.js"
            crossorigin="anonymous"
          ></script>
        </Helmet>
      </HelmetProvider>

      <NavBar />
      <Routes>
        <Route element={<Navigate to="/home" />} path="/" />
        <Route element={<Home />} path="/home" />
        <Route element={<Demo />} path="/demo" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
      </Routes>
    </div>
  );
}

export default App;
