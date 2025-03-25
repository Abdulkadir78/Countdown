import { useEffect, useState } from "react";

import { calculateTimeLeft, formatCount } from "../utils";

interface TimerProps {
  dateTime: string;
  color?: string;
}

export const Timer: React.FC<TimerProps> = ({ dateTime, color }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const { days, hours, minutes, seconds, done } =
        calculateTimeLeft(dateTime);

      setTimeLeft({ days, hours, minutes, seconds });

      if (done) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dateTime]);

  return (
    <div className="text-4xl lg:text-5xl font-medium space-y-1">
      <p className="flex gap-1">
        <CountWrapper color={color}>{formatCount(timeLeft.days)} </CountWrapper>
        {timeLeft.days === 1 ? "Day" : "Days"}
      </p>

      <p className="flex gap-1">
        <CountWrapper color={color}>
          {formatCount(timeLeft.hours)}{" "}
        </CountWrapper>
        {timeLeft.hours === 1 ? "Hour" : "Hours"}
      </p>

      <p className="flex gap-1">
        <CountWrapper color={color}>
          {formatCount(timeLeft.minutes)}{" "}
        </CountWrapper>
        {timeLeft.minutes === 1 ? "Minute" : "Minutes"}
      </p>

      <p className="flex gap-1">
        <CountWrapper color={color}>
          {formatCount(timeLeft.seconds)}{" "}
        </CountWrapper>
        {timeLeft.seconds === 1 ? "Second" : "Seconds"}
      </p>
    </div>
  );
};

const CountWrapper: React.FC<React.PropsWithChildren<{ color?: string }>> = ({
  children,
  color,
}) => {
  return (
    <span
      className="inline-block min-w-[3rem] lg:min-w-[4rem]"
      style={{ color: color || "#000000" }}
    >
      {children}
    </span>
  );
};
