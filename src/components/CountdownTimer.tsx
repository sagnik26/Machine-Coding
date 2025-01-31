import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [inputTime, setInputTime] = useState("00:00:00");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const convertToSeconds = (time: string) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatTime = (time: any) => {
    const hour = Math.floor(time / 3600);
    const minute = Math.floor((time % 3600) / 60);
    const second = Math.floor(time / 60);

    return `${String(hour).padStart(2, "0")} : ${String(minute).padStart(
      2,
      "0"
    )} : ${String(second).padStart(2, "0")}`;
  };

  const startTime = () => {
    if (inputTime && !isRunning) {
      if (timeLeft < 1) {
        setTimeLeft(convertToSeconds(inputTime));
      }
    }

    setIsRunning(true);
  };

  const pauseTime = () => {
    setIsRunning(false);
  };

  const resetTime = () => {
    setInputTime("00:00:00");
    setTimeLeft(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let timer: any = null;
    if (timeLeft > 0 && isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  return (
    <div>
      <h1>Countdown Timer</h1>
      <h2>{formatTime(timeLeft)}</h2>
      <input
        type="text"
        placeholder="input time..."
        value={inputTime}
        onChange={(e: any) => setInputTime(e.target.value)}
      />
      <button onClick={startTime}>start</button>
      <button onClick={pauseTime}>pause</button>
      <button onClick={resetTime}>reset</button>
    </div>
  );
};

export default CountdownTimer;
