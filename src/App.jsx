import { useState } from 'react'
import './App.css'

import NoCount from './NoCount';
import Count from './Count';

function App() {
  const minutes = 1;
  const [counting, setCounting] = useState(false)

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