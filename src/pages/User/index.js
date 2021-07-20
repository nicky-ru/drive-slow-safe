import React, {useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import {Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import {Container} from "@chakra-ui/layout";
import {PolicyList} from "../../components/Policy/policyList";
import {DataPointList} from "../../components/DataPoint/dataPointList";

import {listUsersPolicies, listUsersPenalties} from "../../redux/actions/user";
import {useSelector, useDispatch} from "react-redux";

export const User = observer(() => {
    const dispatch = useDispatch();
    const currentAccount = useSelector((state) => state.wallet.address);

    useEffect(() => {
        if (currentAccount !== '') {
            dispatch(listUsersPolicies(currentAccount));
            dispatch(listUsersPenalties(currentAccount));
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
