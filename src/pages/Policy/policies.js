import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Container, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';

import smartContract from '../../contract/driveSlowSafe';
import {setPolicies} from "../../redux/actions/contract";
import {useSelector, useDispatch} from "react-redux";
import {PolicyListAdmin} from "../../components/Policy/policyListAdmin";

export const Policies = observer(() => {
    const dispatch = useDispatch();
    const currentAccount = useSelector((state) => state.wallet.address);
    const admin = useSelector((state) => state.contract.admin);

    useEffect(() => {
        if (currentAccount.toUpperCase() === admin.toUpperCase()) {
            smartContract.methods.getPolicyIds().call()
                .then((policyIds) => dispatch(setPolicies(policyIds)));
        }
    }, [currentAccount]);

    return(
        <Container>
            <Tabs isFitted>
                <TabList>
                    <Tab>All policies</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <PolicyListAdmin/>
                    </TabPanel>
                </TabPanels>

            </Tabs>
        </Container>
    );
});