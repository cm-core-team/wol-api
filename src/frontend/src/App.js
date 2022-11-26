// styling
import "./App.css";

// components
import Verse from "./components/Verse/Verse";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// routing
import { Routes, Route, Navigate } from "react-router";

// misc
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navigate to="/home" />} path="/" />
        <Route element={<Home />} path="/home" />
        <Route element={<Login />} path="/login" />
      </Routes>
    </>
  );
}

export default App;
