import React from "react";
import "./EnzoImage.css";

interface EnzoImageProps {
  src: string;
  onAnimationEnd: () => void;
}

const EnzoImage: React.FC<EnzoImageProps> = ({ src, onAnimationEnd }) => (
  <img
    src={src}
    alt="Enzo"
    className="enzo-float"
    onAnimationEnd={onAnimationEnd}
    style={{
      position: "absolute",
      left: "50%",
      bottom: 0,
      transform: "translateX(-50%)",
      width: "120px",
      pointerEvents: "none",
      zIndex: 10,
    }}
  />
);

export default EnzoImage;