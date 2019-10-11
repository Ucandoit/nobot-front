import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import AuctionHistory from './auctionHistory/AuctionHistory';

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/nobot">
      <div className="App">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/auction_history">Auction History</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <div>Home</div>
          </Route>
          <Route path="/about">
            <div>About</div>
          </Route>
          <Route path="/auction_history">
            <AuctionHistory />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
