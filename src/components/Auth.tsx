import React, { useState } from "react";

interface AuthProps {
  onAuth: (username: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuth }) => {
  const [username, setUsername] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Nom d'utilisateur requis");
      return;
    }
    if (isRegister) {
      if (localStorage.getItem(`user_${username}`)) {
        setError("Utilisateur déjà existant");
        return;
      }
      localStorage.setItem(`user_${username}`, JSON.stringify({ points: 0 }));
    } else {
      if (!localStorage.getItem(`user_${username}`)) {
        setError("Utilisateur inconnu");
        return;
      }
    }
    onAuth(username);
  };

  return (
    <div>
      <h2>{isRegister ? "Inscription" : "Connexion"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">{isRegister ? "S'inscrire" : "Se connecter"}</button>
      </form>
      <button onClick={() => { setIsRegister(!isRegister); setError(""); }}>
        {isRegister ? "Déjà inscrit ? Se connecter" : "Pas de compte ? S'inscrire"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Auth;