import React from 'react';
import {VStack, Box, Text, Link, Button} from '@chakra-ui/react';
import {Link as ReachLink} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {useSelector} from "react-redux";
import {PolicyModal} from "./policyModal";

export const PolicyList = observer(() => {
    const policyIds = useSelector((state) => state.user.policies);

    return(
        <VStack
            spacing={4}
            align="stretch"
        >
            {policyIds.length > 0 && policyIds.map((policyId) => (
                <Box key={policyId}
                     border={"1px"}
                     borderColor={"dark.100"}
                     borderRadius={16}
                     display="flex"
                     alignItems="center"
                     justifyContent="space-between">
                    <Text marginLeft={"10px"} isTruncated>{policyId}</Text>
                    <Link
                        as={ReachLink}
                        to={`/policy/${policyId}`}
                        params={{ policy: policyId }}>
                        <Button type={"button"}>View</Button>
                    </Link>
                </Box>
            ))}
            {policyIds.length === 0 &&
                <Text>You have no policies yet</Text>
            }
            <PolicyModal/>
        </VStack>
    );
})