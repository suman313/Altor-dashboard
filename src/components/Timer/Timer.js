import React, { useEffect, useState } from 'react'

function Timer({forTimer}) {

    const [running, setRunning] = useState(false);

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    useEffect(() => {
        let timer = null;
        if(forTimer) {
            timer = setInterval(() => {
            setSeconds(seconds + 1);
            if(seconds > 59) {
                setMinutes(minutes + 1)
                setSeconds(0);
            }
            if(minutes > 59) {
                setHours(hours + 1)
                setMinutes(0);
            }
        }, 1000)
        }
        else {
            setHours(0);
            setMinutes(0);
            setSeconds(0);
        }

        return () => clearInterval(timer);
    })


  return (
    <div>
        <p>{hours<10 ?'0':''}{hours} h: {minutes<10 && '0'}{minutes} m: {seconds<10 && '0'}{seconds} s </p>
    </div>
  )
}

export default Timer