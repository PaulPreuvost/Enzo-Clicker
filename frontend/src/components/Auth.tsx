import React, { useState } from "react";

interface AuthProps {
  onAuth: (username: string) => void;
}

const API_URL = "http://localhost:5000/api/user";

const Auth: React.FC<AuthProps> = ({ onAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Nom d'utilisateur et mot de passe requis");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/${isRegister ? "register" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur");
        return;
      }
      onAuth(data.username);
    } catch {
      setError("Erreur réseau");
    }
  };

  return (
    <div style={{ marginTop: 100 }}>
      <h2>{isRegister ? "Inscription" : "Connexion"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoFocus
          style={{ padding: 8, fontSize: 16, borderRadius: 6, border: "1px solid #333" }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: 8, fontSize: 16, borderRadius: 6, border: "1px solid #333" }}
        />
        <button type="submit" style={{ width: 160 }}>
          {isRegister ? "S'inscrire" : "Se connecter"}
        </button>
      </form>
      <button
        onClick={() => { setIsRegister(!isRegister); setError(""); }}
        style={{ marginTop: 10, background: "none", color: "#61dafb", border: "none", cursor: "pointer" }}
      >
        {isRegister ? "Déjà inscrit ? Se connecter" : "Pas de compte ? S'inscrire"}
      </button>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
};

export default Auth;