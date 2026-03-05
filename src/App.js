// CSS
import './css-reset.css'
import './App.css';

// PAGES
import Home from './home/home';
import Questionnaire from "./questionnaire/questionnaire";
import Results from './results/results';

// PAGE RELATED STUFF
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import React from "react";

function App() {
  return (
      <>
          <div className="App">
              <div className="content">
              <Router exact path="/">
                  <div>
                      <Switch>
                          <Route path="/questionnaire/result/:level" component={Questionnaire} />
                          <Route path="/questionnaire" component={Questionnaire} />
                          <Route exact path="/">
                              <Home />
                          </Route>
                          <Route path="/results/:topic/:level">
                              <Results />
                          </Route>
                      </Switch>
                  </div>
              </Router>
              </div>
          </div>
    </>
  );
}

export default App;
