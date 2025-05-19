import React, { useState } from "react";

interface AuthProps {
  onAuth: (username: string) => void;
}

interface UserData {
  password: string;
  scores: Record<string, number>; // { "2024-05-19": 42, ... }
}

const Auth: React.FC<AuthProps> = ({ onAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Nom d'utilisateur et mot de passe requis");
      return;
    }
    const userKey = `user_${username}`;
    const userDataRaw = localStorage.getItem(userKey);

    if (isRegister) {
      if (userDataRaw) {
        setError("Utilisateur déjà existant");
        return;
      }
      const newUser: UserData = {
        password,
        scores: {},
      };
      localStorage.setItem(userKey, JSON.stringify(newUser));
      onAuth(username);
      localStorage.setItem("currentUser", username);
    } else {
      if (!userDataRaw) {
        setError("Utilisateur inconnu");
        return;
      }
      const userData: UserData = JSON.parse(userDataRaw);
      if (userData.password !== password) {
        setError("Mot de passe incorrect");
        return;
      }
      onAuth(username);
      localStorage.setItem("currentUser", username);
    }
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
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
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