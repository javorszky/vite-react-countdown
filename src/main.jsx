import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/:mins" children={<App />} />
        <Route path="*">
          <App />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode >,
  document.getElementById('root')
)
