import React, { useState, useEffect } from "react";
import EnzoImage from "./EnzoImageComponent";

const images = import.meta.glob<{ default: string }>("../assets/enzo/*.png", { eager: true });
const enzoImages: string[] = Object.values(images).map((mod) => mod.default);

interface CookieComponentProps {
  username: string;
}

const CookieComponent: React.FC<CookieComponentProps> = ({ username }) => {
  const [cookies, setCookies] = useState<number>(0);
  const [showEnzo, setShowEnzo] = useState<boolean>(false);
  const [enzoSrc, setEnzoSrc] = useState<string>("");

  // Charger les points au démarrage
  useEffect(() => {
    const userData = localStorage.getItem(`user_${username}`);
    if (userData) {
      setCookies(JSON.parse(userData).points || 0);
    }
  }, [username]);

  // Sauvegarder les points à chaque changement
  useEffect(() => {
    const userData = localStorage.getItem(`user_${username}`);
    if (userData) {
      const data = JSON.parse(userData);
      data.points = cookies;
      localStorage.setItem(`user_${username}`, JSON.stringify(data));
    }
  }, [cookies, username]);

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
      <h2>Cookies: {cookies}</h2>
      <button onClick={handleClick} style={{ fontSize: "2rem" }}>🍪 Cliquer !</button>
      {showEnzo && (
        <EnzoImage src={enzoSrc} onAnimationEnd={handleAnimationEnd} />
      )}
    </div>
  );
};

export default CookieComponent;