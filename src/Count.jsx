import { useState, useRef, useEffect } from 'react'
import moment from 'moment';

function Count(props) {
  const tenMinutesFromNow = moment().add(props.initial * 5, 's')

  const [cdMinute, setCdMinute] = useState('10')
  const [cdSecond, setCdSecond] = useState('00')
  const [cdMs, setCdMs] = useState('00')
  const [ended, setEnded] = useState(false)

  const useAnimationFrame = (callback) => {
    if (ended) {
      return
    }
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = useRef();
    const previousTimeRef = useRef();

    const animate = (time) => {
      if (previousTimeRef.current != undefined) {
        callback()
      }
      if (ended) {
        return
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    }

    useEffect(() => {
      if (ended) {
        console.log('cancelling stuff')
        cancelAnimationFrame(requestRef.current)
      }
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once
  }


  const Counter = () => {
    useAnimationFrame(() => {
      if (ended) {
        return
      }

      const diff = moment.duration(tenMinutesFromNow.diff(moment())).asMilliseconds()

      if (diff < 0) {
        console.log('weve set ended to true')
        setEnded(true)
        return
      }

      const remaining = moment.utc(diff)

      setCdMinute(String(remaining.minutes()).padStart(2, 0))
      setCdSecond(String(remaining.seconds()).padStart(2, 0))
      setCdMs(String(remaining.milliseconds()).padStart(2, 0).substring(0, 2))
    })

    return <p className="final-countdown"><span className="minute">{cdMinute}</span><span className="cdMinuteColon">:</span><span className="cdSecond">{cdSecond}</span><span className="cdSecondColon">:</span><span className="cdMs">{cdMs}</span></p>
  }

  return (
    <Counter />
  )
}

export default Count