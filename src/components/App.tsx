import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import AuctionHistory from './auctionHistory/AuctionHistory';
import DashBoard from './dashboard/Dashboard';
import Accounts from './accounts/Accounts';
import Account from './accounts/Account';
import WarList from './war/WarList';

const App: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.NODE_ENV === 'development' ? '' : '/nobot'}>
      <div className="App">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/accounts">Accounts</Link>
          </li>
          <li>
            <Link to="/war">War</Link>
          </li>
          <li>
            <Link to="/auction_history">Auction History</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <DashBoard />
          </Route>
          <Route exact path="/accounts">
            <Accounts />
          </Route>
          <Route path={`/accounts/:login`}>
            <Account />
          </Route>
          <Route path="/war">
            <WarList />
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
