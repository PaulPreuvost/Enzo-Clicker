import React, { useState } from "react";
import EnzoImage from "./EnzoImageComponent";
import CookiesPerSecond from "./CookiesPerSecond";
import FarmPanel from "./FarmPanel";
import CookieEmoji from "./CookieEmoji";
import { useDailyCookies } from "../hooks/useDailyCookies";
import { useAutoClicker } from "../hooks/useAutoClicker";

const images = import.meta.glob<{ default: string }>("../assets/enzo/*.png", { eager: true });
const enzoImages: string[] = Object.values(images).map((mod) => mod.default);

interface CookieComponentProps {
  username: string;
}

interface FarmLevel {
  name: string;
  cost: number;
  cps: number;
}

const FARM_LEVELS: FarmLevel[] = [
  { name: "Ferme 1", cost: 200, cps: 5 },
  { name: "Ferme 2", cost: 1000, cps: 25 },
  { name: "Ferme 3", cost: 5000, cps: 100 },
  { name: "Ferme 4", cost: 20000, cps: 400 },
  { name: "Ferme 5", cost: 100000, cps: 2000 },
  { name: "Ferme 6", cost: 500000, cps: 10000 },
  { name: "Ferme 7", cost: 2000000, cps: 40000 },
];

const AUTOCLICK_INTERVAL = 1000; // ms

const CookieComponent: React.FC<CookieComponentProps> = ({ username }) => {
  const [showEnzo, setShowEnzo] = useState<boolean>(false);
  const [enzoSrc, setEnzoSrc] = useState<string>("");
  const [autoClickers, setAutoClickers] = useState<number>(0);
  const [farms, setFarms] = useState<number[]>(Array(FARM_LEVELS.length).fill(0));
  const [cookieEmojis, setCookieEmojis] = useState<number[]>([]);

  const today = new Date().toISOString().slice(0, 10);

  // Utilisation du hook personnalisé pour les cookies du jour
  const [cookies, setCookies] = useDailyCookies(username, today);

  // Calcul du rendement total des fermes
  const totalFarmCps = farms.reduce((sum, count, i) => sum + count * FARM_LEVELS[i].cps, 0);

  // Ajoute ce handler pour l'animation des cookies emoji
  const spawnCookieEmoji = () => {
    setCookieEmojis((prev) => [...prev, Date.now()]);
  };

  // Utilisation du hook personnalisé pour l'autoclicker
  useAutoClicker(
    autoClickers,
    totalFarmCps / (1000 / AUTOCLICK_INTERVAL),
    (c) => {
      setCookies(c);
      spawnCookieEmoji();
    },
    AUTOCLICK_INTERVAL
  );

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

  const buyAutoClicker = () => {
    if (cookies >= 50) {
      setCookies(cookies - 50);
      setAutoClickers(autoClickers + 1);
    }
  };

  const buyFarm = (level: number) => {
    const { cost } = FARM_LEVELS[level];
    if (cookies >= cost) {
      setCookies(cookies - cost);
      setFarms(farms => farms.map((f, i) => (i === level ? f + 1 : f)));
    }
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "300px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 260, // Laisse la place à la navbar fermes
      }}
    >
      <FarmPanel
        farms={farms}
        cookies={cookies}
        farmLevels={FARM_LEVELS}
        onBuyFarm={buyFarm}
      />
      {/* Centre */}
      <div style={{ margin: "0 auto" }}>
        <h2>Cookies aujourd'hui : {cookies}</h2>
        <CookiesPerSecond
          autoClickers={autoClickers}
          farms={farms.reduce((sum, count, i) => sum + count * FARM_LEVELS[i].cps, 0) / 5}
        />
        <button onClick={handleClick} style={{ fontSize: "2rem" }}>🍪 Cliquer !</button>
        <div style={{ marginTop: 10 }}>
          <button onClick={buyAutoClicker} disabled={cookies < 50}>
            Acheter un autoclicker 🤖 (50)<br />
            <span>Autoclickers: {autoClickers}</span><br />
            <span>+1 cookie/sec</span>
          </button>
        </div>
        {showEnzo && (
          <EnzoImage src={enzoSrc} onAnimationEnd={handleAnimationEnd} />
        )}
        {cookieEmojis.map((id) => (
          <CookieEmoji
            key={id}
            onAnimationEnd={() =>
              setCookieEmojis((prev) => prev.filter((cookieId) => cookieId !== id))
            }
          />
        ))}
      </div>
      <div style={{ marginLeft: 30, width: 120 }} />
    </div>
  );
};

export default CookieComponent;