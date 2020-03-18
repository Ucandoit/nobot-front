import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import AuctionHistory from './auctionHistory/AuctionHistory';
import DashBoard from './dashboard/Dashboard';
import Accounts from './accounts/Accounts';
import Account from './accounts/Account';
import WarList from './war/WarList';
import Story from './story/Story';
import DrawCard from './drawCard/DrawCard';
import RecruitSystem from './recruit/RecruitSystem';
import AccountForm from './accounts/AccountForm';
import WarAdd from './war/WarAdd';

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
          <li>
            <Link to="/story">Story</Link>
          </li>
          <li>
            <Link to="/draw_card">DrawCard</Link>
          </li>
          <li>
            <Link to="/recruit">Recruit</Link>
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
          <Route path={`/account/create`}>
            <AccountForm isCreate={true} />
          </Route>
          <Route path={`/account/edit/:login`}>
            <AccountForm isCreate={false} />
          </Route>
          <Route exact path="/war">
            <WarList />
          </Route>
          <Route path="/war/create">
            <WarAdd />
          </Route>
          <Route path="/auction_history">
            <AuctionHistory />
          </Route>
          <Route path="/story">
            <Story />
          </Route>
          <Route path="/draw_card">
            <DrawCard />
          </Route>
          <Route path="/recruit">
            <RecruitSystem />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
