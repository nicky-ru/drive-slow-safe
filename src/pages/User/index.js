import React, {useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import { Container, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import {PolicyList} from "../../components/Policy/policyList";
import {DataPointList} from "../../components/DataPoint/dataPointList";

import smartContract from '../../contract/driveSlowSafe';
import {setPolicies, setPenalties} from "../../redux/actions/user";
import {useSelector, useDispatch} from "react-redux";

export const User = observer(() => {
    const dispatch = useDispatch();
    const currentAccount = useSelector((state) => state.wallet.address);

    useEffect(() => {
        if (currentAccount !== '') {
            try {
                smartContract.methods.showMyPolicies().call({from:currentAccount})
                    .then((policies) => {
                        dispatch(setPolicies(policies));
                    })
                smartContract.methods.showMyPenalties().call({from:currentAccount})
                    .then((penalties) => {
                        dispatch(setPenalties(penalties));
                    })
            } catch (e) {
                // handle error
            }
        }
    }, [currentAccount]);

    return(
        <Container>
            <Tabs>
                <TabList>
                    <Tab>My Policies</Tab>
                    <Tab>My Penalties</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <PolicyList/>
                    </TabPanel>
                    <TabPanel>
                        <DataPointList/>
                    </TabPanel>
                </TabPanels>

            </Tabs>
        </Container>
    );
});
