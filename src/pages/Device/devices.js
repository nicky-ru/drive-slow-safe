import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Container, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';

import smartContract from '../../contract/driveSlowSafe';
import {setDevices} from "../../redux/actions/contract";
import {useSelector, useDispatch} from "react-redux";
import {DevicesListAdmin} from "../../components/Device/deviceListAdmin";

export const Devices = observer(() => {
    const dispatch = useDispatch();
    const currentAccount = useSelector((state) => state.wallet.address);
    const admin = useSelector((state) => state.contract.admin);

    useEffect(() => {
        if (currentAccount.toUpperCase() === admin.toUpperCase()) {
            try {
                smartContract.methods.getDeviceIds().call({from: admin})
                    .then((deviceIds) => dispatch(setDevices(deviceIds)));
            } catch (e) {}
        }
    }, [currentAccount]);

    return(
        <Container>
            <Tabs isFitted>
                <TabList>
                    <Tab>All devices</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <DevicesListAdmin/>
                    </TabPanel>
                </TabPanels>

            </Tabs>
        </Container>
    );
});