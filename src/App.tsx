import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AccountForm from './components/accounts/AccountForm';
import Accounts from './components/accounts/Accounts';
import Sell from './components/auction/sell/Sell';
import AuctionHistory from './components/auctionHistory/AuctionHistory';
import CardEdit from './components/card/CardEdit';
import CardList from './components/card/CardList';
import DashBoard from './components/dashboard/Dashboard';
import DrawCard from './components/drawCard/DrawCard';
import RecruitSystem from './components/recruit/RecruitSystem';
import Story from './components/story/Story';
import WarAdd from './components/war/WarAdd';
import WarList from './components/war/WarList';
import { AppBar, SideBar } from './layout';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1,
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      position: 'relative',
      minWidth: 'fit-content',
      width: '100%'
    },
    appFrame: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      [theme.breakpoints.up('xs')]: {
        marginTop: theme.spacing(6)
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(7)
      }
    },
    contentWithSidebar: {
      display: 'flex',
      flexGrow: 1
    }
  })
);

const App: React.FC = () => {
  const classes = useStyle();
  return (
    <BrowserRouter basename="">
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar />
          <main className={classes.contentWithSidebar}>
            <SideBar />
            <Container>
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
                <Route path="/auction/sell">
                  <Sell />
                </Route>
              </Switch>
            </Container>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
