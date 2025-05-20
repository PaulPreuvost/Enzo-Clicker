import React from "react";

interface FarmLevel {
  name: string;
  cost: number;
  cps: number;
}

interface FarmPanelProps {
  farms: number[];
  cookies: number;
  farmLevels: FarmLevel[];
  onBuyFarm: (level: number) => void;
}

const FarmPanel: React.FC<FarmPanelProps> = ({ farms, cookies, farmLevels, onBuyFarm }) => (
  <aside
    style={{
      position: "fixed",
      left: 0,
      top: 0,
      height: "100vh",
      width: 240,
      padding: "40px 0 0 0",
      background: "rgba(24,24,24,0.98)",
      display: "flex",
      flexDirection: "column",
      gap: 12,
      alignItems: "flex-start",
      zIndex: 100,
      borderRight: "1px solid #222"
    }}
  >
    {[...farmLevels].reverse().map((farm, i) => {
      const realIndex = farmLevels.length - 1 - i;
      return (
        <button
          key={farm.name}
          onClick={() => onBuyFarm(realIndex)}
          disabled={cookies < farm.cost}
          style={{
            width: 200,
            minWidth: 200,
            maxWidth: 200,
            height: 100,
            textAlign: "left",
            background: "#181818",
            color: "#fff",
            border: "1px solid #333",
            borderRadius: 8,
            padding: "10px 14px",
            opacity: cookies < farm.cost ? 0.5 : 1,
            cursor: cookies < farm.cost ? "not-allowed" : "pointer",
            marginLeft: 16,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <strong>{farm.name}</strong> ({farm.cost} cookies)
          <br />
          <span>Possédées : {farms[realIndex]}</span>
          <br />
          <span>+{farm.cps} cookies/sec</span>
        </button>
      );
    })}
  </aside>
);

export default FarmPanel;