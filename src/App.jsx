import { useState } from 'react'
import {
  useParams
} from "react-router-dom";
import './App.css'

import NoCount from './NoCount';
import Count from './Count';

function App() {
  const [counting, setCounting] = useState(false)

  let { mins } = useParams();

  let minutes = Number.parseInt(mins)
  if (Number.isNaN(minutes)) {
    minutes = 10;
  }

  return (
    <>
      {counting ?
        <Count initial={minutes} /> :
        <NoCount
          cdMinute={String(minutes).padStart(2, 0)}
          cdSecond="00"
          cdMs="00"
        />}
      <div className="buttons">
        {counting
          ? <button className="reset" onClick={() => { setCounting(false) }}>Reset</button>
          : <button className="yeet" onClick={() => { setCounting(true) }}>Yeet!</button>
        }
      </div>
    </>
  )
}

export default App