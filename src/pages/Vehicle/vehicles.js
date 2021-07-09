import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Container, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import {VehiclesListAdmin} from "../../components/Vehicle/vehiclesListAdmin";
import smartContract from '../../contract/driveSlowSafe';
import {setVehicles} from "../../redux/actions/contract";
import {useSelector, useDispatch} from "react-redux";

export const Vehicles = observer(() => {
    const dispatch = useDispatch();
    const currentAccount = useSelector((state) => state.wallet.address);
    const admin = useSelector((state) => state.contract.admin);

    useEffect(() => {
        if (currentAccount.toUpperCase() === admin.toUpperCase()) {
            smartContract.methods.getVehicleIds().call()
                .then((vehicleIds) => dispatch(setVehicles(vehicleIds)));
        }
    }, [currentAccount]);

    return(
        <Container>
            <Tabs isFitted>
                <TabList>
                    <Tab>All vehicles</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <VehiclesListAdmin/>
                    </TabPanel>
                </TabPanels>

            </Tabs>
        </Container>
    );
});