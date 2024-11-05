import { useEffect, useState } from "react"
interface CountDownTimerProps {
  timeInSeconds: number
}
export default function CountdownTimer({timeInSeconds}:CountDownTimerProps) {
  const [time, setTime] = useState(timeInSeconds) 
  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [time]);

  return (
    <div>
      <h2>Time Remaining: {time} seconds</h2>
      {time === 0 && <p>Time's up!</p>}
    </div>
  )
}