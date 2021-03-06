import React from 'react';
import {observer} from "mobx-react-lite";
import {Box, Button, Link, Text, VStack} from '@chakra-ui/react';
import {useSelector} from "react-redux";
import {Link as ReachLink} from "react-router-dom";
import {PartnerModal} from "./partnerModal";

export const PartnersList = observer(() => {
    const partnersIds = useSelector((state) => state.contract.partners);

    return(
        <VStack
            spacing={4}
            align="stretch"
        >
            {partnersIds.length > 0 && partnersIds.map((partnerId) => (
                <Box key={partnerId}
                     border={"1px"}
                     borderColor={"dark.100"}
                     borderRadius={16}
                     display="flex"
                     alignItems="center"
                     justifyContent="space-between">
                    <Text marginLeft={"10px"} isTruncated>{partnerId}</Text>
                    <Link
                        as={ReachLink}
                        to={`/partner/${partnerId}`}
                        params={{ partner: partnerId }}>
                        <Button type={"button"}>View</Button>
                    </Link>
                </Box>
            ))}
            {partnersIds.length === 0 &&
            <Text>No registered partners</Text>
            }
            <PartnerModal/>
        </VStack>
    );
});