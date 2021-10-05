import { useState, useRef, useEffect } from 'react'
import moment from 'moment';

function Count(props) {
  // When the elment is called, lets get a point in time props.initial minutes into the future.
  const tenMinutesFromNow = moment().add(props.initial * 5, 's')

  // Declare all the things we want to keep track of and render by.
  const [cdMinute, setCdMinute] = useState('10')
  const [cdSecond, setCdSecond] = useState('00')
  const [cdMs, setCdMs] = useState('00')
  const [ended, setEnded] = useState(false)

  console.log('so, apparently we redeclared everything again', ended)
  // Define the custom hook here.
  // This is pretty straight taken from @see https://css-tricks.com/using-requestanimationframe-with-react-hooks/.
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
      console.log('=== ended is', ended)
      if (!ended) {
        requestRef.current = requestAnimationFrame(animate);
      }
    }

    useEffect(() => {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once
  }

  // Declare the function that needs to happen every time a request animation frame is ran.
  // This gets passed to the custom hook to happen on every re-render.
  const recalculateTime = () => {
    // get the time difference between some point in the future and now.
    // This will make sure the time is decreasing and we have a counter.
    const diff = moment.duration(tenMinutesFromNow.diff(moment())).asMilliseconds()

    // Ideally when the new diff would reach below zero, the request animation would stop,
    // the dom would stop updating, and javascript would stop looping its things.
    if (diff < 0) {
      setEnded(true)
      console.log('weve set ended to true')
    }

    // Do some calculations to get the values as to what we actually need to update
    // the numbers to each frame.
    const remaining = moment.utc(diff)

    setCdMinute(String(remaining.minutes()).padStart(2, 0))
    setCdSecond(String(remaining.seconds()).padStart(2, 0))
    setCdMs(String(remaining.milliseconds()).padStart(2, 0).substring(0, 2))
  }

  // Call the custom hook.
  useAnimationFrame(recalculateTime)

  // Return a fragment that uses the numbers that get updated every frame.
  return (
    <p className="final-countdown"><span className="minute">{cdMinute}</span><span className="cdMinuteColon">:</span><span className="cdSecond">{cdSecond}</span><span className="cdSecondColon">:</span><span className="cdMs">{cdMs}</span></p>
  )
}

export default Count