import React from "react";

interface CookiesPerSecondProps {
  autoClickers: number;
  farms: number;
}

const CookiesPerSecond: React.FC<CookiesPerSecondProps> = ({ autoClickers, farms }) => {
  const perSecond = autoClickers * 1 + farms * 5;
  return (
    <div style={{ margin: "10px 0", fontWeight: "bold" }}>
      Rendement : {perSecond} cookies/sec
    </div>
  );
};

export default CookiesPerSecond;