import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Container, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import {PartnersList} from "../../components/Partner/partnersList";
import {useDispatch, useSelector} from "react-redux";
import smartContract from "../../contract/driveSlowSafe";
import {setPartners} from "../../redux/actions/contract";

export const Partners = observer(() => {
    const dispatch = useDispatch();
    const currentAccount = useSelector((state) => state.wallet.address);

    useEffect(() => {
        smartContract.methods.getPartnerIds().call()
            .then((partnersIds) => dispatch(setPartners(partnersIds)));

    }, [currentAccount]);

    return(
        <Container>
            <Tabs isFitted>
                <TabList>
                    <Tab>All partners</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <PartnersList/>
                    </TabPanel>
                </TabPanels>

            </Tabs>
        </Container>
    );
});