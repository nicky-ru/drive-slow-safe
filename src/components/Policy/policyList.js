import React from 'react';
import {VStack, Box, Text, Link, Button} from '@chakra-ui/react';
import {observer} from "mobx-react-lite";
import {useSelector} from "react-redux";

export const PolicyList = observer(() => {
    const policyIds = useSelector((state) => state.user.policies);
    const policies = useSelector((state) => state.policy);

    return(
        <VStack
            spacing={4}
            align="stretch"
        >
            {policies[policyIds[0]] && policyIds.map((policyId) => (
                <Box key={policies[policyId].policyHolder}
                     border={"1px"}
                     borderColor={"dark.100"}
                     borderRadius={16}
                     display="flex"
                     alignItems="center"
                     justifyContent="space-between">
                    <Text marginLeft={"10px"}>{policies[policyId].policyHolder}</Text>
                    <Link
                        href={`/policy/${policies[policyId].policyHolder}`}
                        params={{ policy: policies[policyId].policyHolder }}>
                        <Button type={"button"}>View</Button>
                    </Link>
                </Box>
            ))}
            {policies.length === 0 &&
                <Text>You have no policies yet</Text>
            }
        </VStack>
    );
})