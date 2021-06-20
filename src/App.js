import './App.css';
import Home from './components/Home/Home';
import FullView from './components/Card/FullView';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createContext, useState } from 'react';
export const UserContext = createContext();

function App() {
  const [contextData, setContextData] = useState(null);

  return (
    <UserContext.Provider value={[contextData, setContextData]}>
      <Router>
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/fullView">
          <FullView />
        </Route>

      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
