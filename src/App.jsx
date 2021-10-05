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
        {counting ? <Count initial={minutes} /> : <NoCount initial={String(minutes).padStart(2, 0) + ":00:00"} />}
        <button onClick={() => { setCounting(true) }}>Yeet!</button>
        <button onClick={() => { setCounting(false) }}>Reset</button>
      </header>
    </div>
  )
}

export default App