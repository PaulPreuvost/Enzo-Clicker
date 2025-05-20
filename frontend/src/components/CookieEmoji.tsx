import React from "react";
import "./EnzoImage.css"; // On réutilise l'animation CSS

interface CookieEmojiProps {
  onAnimationEnd: () => void;
}

const CookieEmoji: React.FC<CookieEmojiProps> = ({ onAnimationEnd }) => (
  <span
    className="enzo-float"
    onAnimationEnd={onAnimationEnd}
    style={{
      position: "absolute",
      left: "50%",
      bottom: 0,
      transform: "translateX(-50%)",
      fontSize: "3rem",
      pointerEvents: "none",
      zIndex: 10,
      userSelect: "none",
    }}
    role="img"
    aria-label="cookie"
  >
    🍪
  </span>
);

export default CookieEmoji;