import { useEffect } from "react";

export function useAutoClicker(
  autoClickers: number,
  farms: number,
  setCookies: React.Dispatch<React.SetStateAction<number>>,
  intervalMs: number
) {
  useEffect(() => {
    if (autoClickers === 0 && farms === 0) return;
    const interval = setInterval(() => {
      setCookies(c => c + autoClickers + farms * 5);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [autoClickers, farms, setCookies, intervalMs]);
}