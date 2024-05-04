import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Добавляем Switch
import Main from './pages/Main/Main';
import Profile from './pages/Profile/Profile';
import Entrance from './pages/Entrance/Entrance'; // Добавляем компонент Entrance

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Entrance} />
          <Route path="/main" component={Main} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
