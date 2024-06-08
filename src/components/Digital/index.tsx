import React, { useEffect, useState } from "react";

const Digital: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  // Extract hours, minutes, and seconds with leading zeroes
  const hours: string = String(date.getHours()).padStart(2, "0");
  const minutes: string = String(date.getMinutes()).padStart(2, "0");
  const seconds: string = String(date.getSeconds()).padStart(2, "0");

  return (
    <div
      className="digital_clock"
      style={{ fontSize: "48px", fontFamily: "monospace" }}
    >
      {hours}:{minutes}:{seconds}
    </div>
  );
};

export default Digital;
