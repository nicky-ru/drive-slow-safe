import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import {Container} from "@chakra-ui/layout";
import {VehiclesListAdmin} from "../../components/Vehicle/vehiclesListAdmin";
import {listVehicles} from "../../redux/actions/contract";
import {useSelector, useDispatch} from "react-redux";

export const Vehicles = observer(() => {
    const dispatch = useDispatch();
    const currentAccount = useSelector((state) => state.wallet.address);
    const admin = useSelector((state) => state.contract.admin);

    useEffect(() => {
        if (admin && (currentAccount.toUpperCase() === admin.toUpperCase())) {
            dispatch(listVehicles(currentAccount));
        }
    }, [currentAccount, admin]);

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