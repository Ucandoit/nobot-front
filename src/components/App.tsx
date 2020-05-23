import React from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import AccountForm from './accounts/AccountForm';
import Accounts from './accounts/Accounts';
import './App.css';
import AuctionHistory from './auctionHistory/AuctionHistory';
import DashBoard from './dashboard/Dashboard';
import DrawCard from './drawCard/DrawCard';
import RecruitSystem from './recruit/RecruitSystem';
import Story from './story/Story';
import WarAdd from './war/WarAdd';
import WarList from './war/WarList';
import CardList from './card/CardList';
import CardEdit from './card/CardEdit';

const App: React.FC = () => {
  return (
    <BrowserRouter basename="">
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
          <li>
            <Link to="/cards">Cards</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <Route path="/dashboard">
            <DashBoard />
          </Route>
          <Route exact path="/accounts">
            <Accounts />
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
          <Route exact path="/cards">
            <CardList />
          </Route>
          <Route path="/cards/:id">
            <CardEdit />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
