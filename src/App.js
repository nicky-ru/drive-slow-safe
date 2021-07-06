import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Dss from './contract/driveSlowSafe';
import {theme} from "./lib/theme";
import {Header} from './components/Header/index'
import {Start} from './pages/Start/index'
import {Admin} from "./pages/Admin";
import {User} from "./pages/User";
import {Policy} from "./pages/Policy";
import {Vehicle} from "./pages/Vehicle";
import {Device} from "./pages/Device";
import {DataPoint} from "./pages/DataPoint";

// import {updateContract} from "./redux/actions/contract";
import {updateUser} from "./redux/actions/user";


function App() {
  // define App state helpers
  // const admin = useSelector((state => state.contract.admin));
  const dispatch = useDispatch();

  useEffect(() => {
    // Dss.methods.administrator().call().then((admin) => dispatch(updateContract(
    //     '0x311388275Ffe79Fd576b93f5431397A838604F5D',
    //     admin
    // )));

    const {ethereum} = window;
    ethereum.on('accountsChanged', handleAccountsChanged);
    dispatch(updateUser(ethereum.selectedAddress));
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      dispatch(updateUser(accounts[0]));
    }
  }

  return (
      <ChakraProvider theme={theme}>
        <Router>
          <Header/>
          <Switch>
            <Route path={'/'} exact key={'/'} component={Start}/>
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
