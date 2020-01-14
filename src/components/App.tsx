import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import AuctionHistory from './auctionHistory/AuctionHistory';
import WarList from './war/WarList';
import Story from './story/Story';

import { Admin, Resource, Layout, getResources, MenuItemLink } from 'react-admin';
import springDataProvider from '../data-provider';
import AccountList from './accounts/AccountList';
import { useSelector } from 'react-redux';
import AccountCreate from './accounts/AccountCreate';

const customRoutes = [
  <Route path="/war">
    <WarList />
  </Route>,
  <Route path="/auction_history">
    <AuctionHistory />
  </Route>,
  <Route path="/story">
    <Story />
  </Route>
];

const MyMenu = ({ onMenuClick, logout }: any) => {
  const resources = useSelector(getResources);
  return (
    <div>
      {resources.map((resource: any) => (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          primaryText={(resource.options && resource.options.label) || resource.name}
          onClick={onMenuClick}
        />
      ))}
      <MenuItemLink to="/war" primaryText="War" onClick={onMenuClick} />
      <MenuItemLink to="/auction_history" primaryText="Auction history" onClick={onMenuClick} />
      <MenuItemLink to="/story" primaryText="Story" onClick={onMenuClick} />
    </div>
  );
};

const MyLayout = (props: any) => <Layout {...props} menu={MyMenu} />;

const App: React.FC = () => {
  return (
    <Admin dataProvider={springDataProvider(`${ROOT_API}/api/rest`)} layout={MyLayout} customRoutes={customRoutes}>
      <Resource name="accounts" list={AccountList} create={AccountCreate} />
    </Admin>
    // <BrowserRouter basename={process.env.NODE_ENV === 'development' ? '' : '/nobot'}>
    //   <div className="App">
    //     <ul>
    //       <li>
    //         <Link to="/">Dashboard</Link>
    //       </li>
    //       <li>
    //         <Link to="/accounts">Accounts</Link>
    //       </li>
    //       <li>
    //         <Link to="/war">War</Link>
    //       </li>
    //       <li>
    //         <Link to="/auction_history">Auction History</Link>
    //       </li>
    //       <li>
    //         <Link to="/story">Story</Link>
    //       </li>
    //     </ul>
    //     <Switch>
    //       <Route exact path="/">
    //         <DashBoard />
    //       </Route>
    //       <Route exact path="/accounts">
    //         <Accounts />
    //       </Route>
    //       <Route path={`/accounts/:login`}>
    //         <Account />
    //       </Route>
    //       <Route path="/war">
    //         <WarList />
    //       </Route>
    //       <Route path="/auction_history">
    //         <AuctionHistory />
    //       </Route>
    //       <Route path="/story">
    //         <Story />
    //       </Route>
    //     </Switch>
    //   </div>
    // </BrowserRouter>
  );
};

export default App;
