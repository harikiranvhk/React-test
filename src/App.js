import './App.css';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homePage.component'

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
