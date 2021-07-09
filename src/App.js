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

import {updateAccount, unlock, lock} from "./redux/actions/wallet";
import {isAdmin} from "./redux/actions/user";
import {ToolConfig} from "./pages/Admin/tools";
import {Holder} from "./pages/Holder";


function App() {
  // define App state helpers
  const dispatch = useDispatch();
  const contractAdmin = useSelector((state) => state.contract.admin);
  const isLocked = useSelector((state) => state.wallet.isLocked);

  useEffect(() => {
    const {ethereum} = window;

    ethereum._metamask.isUnlocked()
        .then((resp) => {
          if (resp) dispatch(unlock);
        });

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
      dispatch(lock());
    } else {
      dispatch(updateAccount(accounts[0]));
      dispatch(isAdmin(accounts[0].toUpperCase() === contractAdmin.toUpperCase()));
    }
  }

  const handleConnect = () => {
    document.getElementById("connect-button").hidden = true;

    window.ethereum
        .request({method: 'eth_requestAccounts'})
        .then((accounts) => {
          handleAccountsChanged(accounts);
          window.location.assign('/user');
        })
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            console.log('Please connect to MetaMask.');
          } else {
            console.error(err);
          }
        });
  }

  return (
      <ChakraProvider theme={theme}>
        <Router>
          <Header/>
          <Switch>
            <Route path={'/'} exact key={'/'}>
              {isLocked ?
                  <Start handleConnect={handleConnect}/> :
                  <Redirect to={'/user'}/>
              }
            </Route>
            <Route path={'/admin'} exact key={'/admin'} component={Admin}/>
            <Route path={'/user'} exact key={'/user'} component={User}/>
            <Route path={'/holder/:slug'} exact key={'/holder/:slug'} component={Holder}/>
            <Route path={'/device/:slug'} exact key={'/device/:slug'}><Device/></Route>
            <Route path={'/policy/:slug'} exact key={'/policy/:slug'}><Policy/></Route>
            <Route path={'/vehicle/:slug'} exact key={'/vehicle/:slug'}><Vehicle/></Route>
            <Route path={'/data_point/:slug'} exact key={'/data_point/:slug'}><DataPoint/></Route>
              {ToolConfig.tools.map((i) => (
                  <Route path={ToolConfig[i].path} exact key={ToolConfig[i].path} component={ToolConfig[i].component}/>
              ))}
          </Switch>
        </Router>
      </ChakraProvider>
  );
}

export default App;
