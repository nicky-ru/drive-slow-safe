import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react';
import {Container} from "@chakra-ui/layout";
import {PartnersList} from "../../components/Partner/partnersList";
import {useDispatch, useSelector} from "react-redux";
import {listPartners} from "../../redux/actions/contract";

export const Partners = observer(() => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listPartners());
    }, []);

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