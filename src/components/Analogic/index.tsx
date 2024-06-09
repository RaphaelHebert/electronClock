import React from "react";
import { getHoursMinutesSeconds } from "@/utils/time";
import "./index.css";

interface ClockNumber {
  classN: string;
  num: number;
}

const basePosition: (num: number) => React.CSSProperties = (num) => {
  return {
    transformOrigin: "center bottom",
    transform: `rotate(${num}deg)`,
  };
};
const Analogic: React.FC = () => {
  const [hours, minutes, seconds] = getHoursMinutesSeconds();

  const clockNumbers: ClockNumber[] = [
    { classN: "", num: 12 },
    { classN: "two", num: 2 },
    { classN: "four", num: 4 },
    { classN: "six", num: 6 },
    { classN: "height", num: 8 },
    { classN: "ten", num: 10 },
  ];

  return (
    <div className="main">
      <div className="container">
        <div className="clock">
          {clockNumbers.map(({ classN, num }) => (
            <div key={classN} className={`number ${classN}`}>
              <p>{num}</p>
            </div>
          ))}
          <div className="needle" style={basePosition(seconds)}>
            <div className="hands" />
          </div>
          <div className="needle" style={basePosition(minutes)}>
            <div className="hands min" />
          </div>
          <div className="needle" style={basePosition(hours)}>
            <div className="hands day" />
          </div>
          <div className="center" />
        </div>
      </div>
    </div>
  );
};

export default Analogic;
