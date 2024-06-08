import React from "react";
import "./index.css";

interface ClockNumber {
  classN: string;
  num: number;
}

const Analogic: React.FC = () => {
  const now = new Date();

  // Extract hours, minutes, and seconds
  const hours = ((now.getHours() + now.getMinutes() / 60) / 12) * 360;
  const minutes = (now.getMinutes() / 60) * 360;
  const seconds = (now.getSeconds() / 60) * 360;

  const hourPosition: React.CSSProperties = {
    transformOrigin: "center bottom",
    transform: `rotate(${hours}deg)`,
  };

  const minPosition: React.CSSProperties = {
    transformOrigin: "center bottom",
    transform: `rotate(${minutes}deg)`,
  };

  const secPosition: React.CSSProperties = {
    transformOrigin: "center bottom",
    transform: `rotate(${seconds}deg)`,
  };

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
          <div className="needle" style={secPosition}>
            <div className="hands" />
          </div>
          <div className="needle" style={minPosition}>
            <div className="hands min" />
          </div>
          <div className="needle" style={hourPosition}>
            <div className="hands day" />
          </div>
          <div className="center" />
        </div>
      </div>
    </div>
  );
};

export default Analogic;
