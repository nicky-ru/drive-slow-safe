import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Container, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import {HoldersList} from "../../components/Holder/holdersList";
import {useDispatch, useSelector} from "react-redux";
import smartContract from "../../contract/driveSlowSafe";
import {setHolders} from "../../redux/actions/contract";

export const Holders = observer(() => {
    const dispatch = useDispatch();
    const currentAccount = useSelector((state) => state.wallet.address);
    const admin = useSelector((state) => state.contract.admin);

    useEffect(() => {
        if (currentAccount.toUpperCase() === admin.toUpperCase()) {
            smartContract.methods.getHoldersIds().call()
                .then((holdersIds) => dispatch(setHolders(holdersIds)));
        }
    }, [currentAccount]);

    return(
        <Container>
            <Tabs isFitted>
                <TabList>
                    <Tab>All holders</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <HoldersList/>
                    </TabPanel>
                </TabPanels>

            </Tabs>
        </Container>
    );
});