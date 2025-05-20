import { useState, useEffect } from "react";

interface UserData {
  password: string;
  scores: Record<string, number>;
}

export function useDailyCookies(username: string, today: string) {
  const [cookies, setCookies] = useState<number>(0);

  // Charger le score du jour au démarrage
  useEffect(() => {
    const userDataRaw = localStorage.getItem(`user_${username}`);
    if (userDataRaw) {
      const userData: UserData = JSON.parse(userDataRaw);
      setCookies(userData.scores?.[today] || 0);
    }
  }, [username, today]);

  // Sauvegarder le score du jour à chaque changement
  useEffect(() => {
    const userDataRaw = localStorage.getItem(`user_${username}`);
    if (userDataRaw) {
      const userData: UserData = JSON.parse(userDataRaw);
      userData.scores = userData.scores || {};
      userData.scores[today] = cookies;
      localStorage.setItem(`user_${username}`, JSON.stringify(userData));
    }
  }, [cookies, username, today]);

  return [cookies, setCookies] as const;
}