import React, { useState, useEffect } from "react";
import EnzoImage from "./EnzoImageComponent";

const images = import.meta.glob<{ default: string }>("../assets/enzo/*.png", { eager: true });
const enzoImages: string[] = Object.values(images).map((mod) => mod.default);

interface CookieComponentProps {
  username: string;
}

interface UserData {
  password: string;
  scores: Record<string, number>;
}

const CookieComponent: React.FC<CookieComponentProps> = ({ username }) => {
  const [cookies, setCookies] = useState<number>(0);
  const [showEnzo, setShowEnzo] = useState<boolean>(false);
  const [enzoSrc, setEnzoSrc] = useState<string>("");

  const today = new Date().toISOString().slice(0, 10);

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

  const handleClick = () => {
    const newCookies = cookies + 1;
    setCookies(newCookies);

    if (newCookies % 5 === 0 && enzoImages.length > 0) {
      const randomIndex = Math.floor(Math.random() * enzoImages.length);
      setEnzoSrc(enzoImages[randomIndex]);
      setShowEnzo(true);
    }
  };

  const handleAnimationEnd = () => {
    setShowEnzo(false);
  };

  return (
    <div style={{ position: "relative", minHeight: "300px" }}>
      <h2>Cookies aujourd'hui : {cookies}</h2>
      <button onClick={handleClick} style={{ fontSize: "2rem" }}>🍪 Cliquer !</button>
      {showEnzo && (
        <EnzoImage src={enzoSrc} onAnimationEnd={handleAnimationEnd} />
      )}
    </div>
  );
};

export default CookieComponent;