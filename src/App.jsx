import { useState, useRef } from 'react'

import moment from 'moment';
import './App.css'

import NoCount from './NoCount';
import Count from './Count';


function App() {
  const minutes = 10;
  const [counting, setCounting] = useState(false)


  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  )
}

export default App