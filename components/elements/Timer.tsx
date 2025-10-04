import React, {useState, useEffect} from 'react'
type TimerProps = {
    duration: number // miliseconds
    isCountingDown: boolean
}


const Timer = ({duration, isCountingDown}: TimerProps) => {
    const [time, setTime] = useState<number>(duration)

    useEffect(() => {
        setTime(duration);
    }, [duration]);

    let timeHandler: any;
    useEffect(() => {
        if (time > 0 && isCountingDown === true) {
            timeHandler = setTimeout(() => {
                setTime(t => Math.max(0, t - 1000));
            }, 1000)
        }
        return () => {
            clearTimeout(timeHandler)
        }
    }, [time, isCountingDown])

    const getFormattedTime = (miliseconds: number) => {
        let total_seconds: number = Math.floor(miliseconds / 1000)
        let total_minutes: number = Math.floor(total_seconds / 60)
        let total_hours: number = Math.floor(total_minutes / 60)

        let seconds: number = total_seconds % 60
        let minutes: number = total_minutes % 60
        let hours: number = total_hours % 24

        return `${hours}:${minutes}:${seconds}`
    }

  return (
    <div>
      {getFormattedTime(time)}
    </div>
  )
}

export default Timer
