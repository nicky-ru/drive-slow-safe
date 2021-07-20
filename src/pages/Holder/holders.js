import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import {Container} from "@chakra-ui/layout";
import {HoldersList} from "../../components/Holder/holdersList";
import {useDispatch, useSelector} from "react-redux";
import {listHolders} from "../../redux/actions/contract";

export const Holders = observer(() => {
    const dispatch = useDispatch();
    const currentAccount = useSelector((state) => state.wallet.address);
    const admin = useSelector((state) => state.contract.admin);

    useEffect(() => {
        if (admin && (currentAccount.toUpperCase() === admin.toUpperCase())) {
            dispatch(listHolders(currentAccount));
        }
    }, [currentAccount, admin]);

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