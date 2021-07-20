import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import {Container} from "@chakra-ui/layout";

import {listPolicies} from "../../redux/actions/contract";
import {useSelector, useDispatch} from "react-redux";
import {PolicyListAdmin} from "../../components/Policy/policyListAdmin";

export const Policies = observer(() => {
    const dispatch = useDispatch();
    const currentAccount = useSelector((state) => state.wallet.address);
    const admin = useSelector((state) => state.contract.admin);

    useEffect(() => {
        if (admin && (currentAccount.toUpperCase() === admin.toUpperCase())) {
            dispatch(listPolicies(currentAccount));
        }
    }, [currentAccount, admin]);

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