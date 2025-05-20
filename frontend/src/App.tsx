import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth";
import CookieComponent from "./components/CookieComponent";
import "./App.css";

function App() {
  const [username, setUsername] = useState<string | null>(localStorage.getItem("currentUser"));

  const handleAuth = (user: string) => {
    setUsername(user);
    localStorage.setItem("currentUser", user);
  };

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <BrowserRouter>
      <div className="App">
        <h1 className="centered-title">Enzo Cookie Clicker</h1>
        {username && (
          <button onClick={handleLogout} style={{ position: "absolute", right: 20, top: 20 }}>
            Déconnexion
          </button>
        )}
        <Routes>
          <Route
            path="/"
            element={
              username ? <Navigate to="/game" /> : <Auth onAuth={handleAuth} />
            }
          />
          <Route
            path="/game"
            element={
              username ? <CookieComponent username={username} /> : <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;