import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {theme} from "./lib/theme";
import {Header} from './components/Header/index'
import {Start} from './pages/Start/index'
import {Admin} from "./pages/Admin";
import {User} from "./pages/User";
import {Policy} from "./pages/Policy";
import {Vehicle} from "./pages/Vehicle";
import {Device} from "./pages/Device";
import {DataPoint} from "./pages/DataPoint";

import {connect, updateAccount} from "./redux/actions/wallet";
import {isAdmin} from "./redux/actions/user";


function App() {
  // define App state helpers
  const dispatch = useDispatch();
  const connected = useSelector((state) => state.wallet.isConnected);
  const contractAdmin = useSelector((state) => state.contract.admin);

  useEffect(() => {
    const {ethereum} = window;

    ethereum
        .request({method: 'eth_accounts'})
        .then(handleAccountsChanged)
        .catch((err) => {
          console.error(err);
        })

    ethereum.on('accountsChanged', handleAccountsChanged);
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
    } else {
      if (!connected) dispatch(connect());

      dispatch(updateAccount(accounts[0]));

      dispatch(isAdmin(accounts[0].toUpperCase() === contractAdmin.toUpperCase()));
    }
  }

  const handleConnect = () => {
    window.ethereum
        .request({method: 'eth_requestAccounts'})
        .then(handleAccountsChanged);
  }

  return (
      <ChakraProvider theme={theme}>
        <Router>
          <Header/>
          <Switch>
            <Route path={'/'} exact key={'/'}>
              {connected ?
                  <Redirect to={'/user'}/> :
                  <Start handleConnect={handleConnect}/>
              }
            </Route>
            <Route path={'/admin'} exact key={'/admin'} component={Admin}/>
            <Route path={'/user'} exact key={'/user'} component={User}/>
            <Route path={'/device/:slug'} exact key={'/device/:slug'}><Device/></Route>
            <Route path={'/policy/:slug'} exact key={'/policy/:slug'}><Policy/></Route>
            <Route path={'/vehicle/:slug'} exact key={'/vehicle/:slug'}><Vehicle/></Route>
            <Route path={'/data_point/:slug'} exact key={'/data_point/:slug'}><DataPoint/></Route>
          </Switch>
        </Router>
      </ChakraProvider>
  );
}

export default App;
