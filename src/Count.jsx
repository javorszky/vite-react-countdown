import { useState, useRef, useEffect } from 'react'
import moment from 'moment';

function Count(props) {
  const tenMinutesFromNow = moment().add(props.initial, 'm')

  const useAnimationFrame = (callback) => {
    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = useRef();
    const previousTimeRef = useRef();

    const animate = time => {
      if (previousTimeRef.current != undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime)
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    }

    useEffect(() => {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once
  }

  const Counter = () => {
    const [countdown, setCountdown] = useState("10:00:00")

    useAnimationFrame(() => {
      const remaining = moment.duration(tenMinutesFromNow.diff(moment()))
      setCountdown(moment.utc(
        remaining.asMilliseconds()
      ).format("mm:ss:SS")
      )
    })

    return <p className="final-countdown">{countdown}</p>
  }

  return (
    <Counter />
  )
}

export default Count