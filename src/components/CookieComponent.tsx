import React, { useState } from "react";
import EnzoImage from "./EnzoImageComponent";

// Import dynamique de toutes les images du dossier enzo (Vite)
const images = import.meta.glob<{ default: string }>("../assets/enzo/*.png", { eager: true });
const enzoImages: string[] = Object.values(images).map((mod) => mod.default);

interface CookieComponentProps {
  initialCookies?: number;
}

const CookieComponent: React.FC<CookieComponentProps> = ({ initialCookies = 0 }) => {
  const [cookies, setCookies] = useState<number>(initialCookies);
  const [showEnzo, setShowEnzo] = useState<boolean>(false);
  const [enzoSrc, setEnzoSrc] = useState<string>("");

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