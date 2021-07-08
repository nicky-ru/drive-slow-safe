import React from 'react';
import {observer} from "mobx-react-lite";
import {VStack, HStack, Box, Text} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";

export const PolicyInfo = observer(() => {
    let { slug } = useParams();
    const policy = useSelector((state) => state.policy[slug]);

    return(
        <>
            {policy &&
                <VStack align={"left"}>
                    <HStack>
                        <Box w={"25%"}>Status:</Box>
                        <Box>{policy.isActive ? <Text>Active</Text> : <Text>Not active</Text>}</Box>
                    </HStack>
                    <HStack>
                        <Box w={"25%"}>Policy Holder ID:</Box>
                        <Box>{policy.policyHolder}</Box>
                    </HStack>
                    <HStack>
                        <Box w={"25%"}>Vehicle ID:</Box>
                        <Box maxWidth={"70%"}><Text isTruncated>{policy.car}</Text></Box>
                    </HStack>
                    <HStack>
                        <Box w={"25%"}>Device ID:</Box>
                        <Box>{policy.device}</Box>
                    </HStack>
                    <HStack>
                        <Box w={"25%"}>Premium:</Box>
                        <Box>{policy.premium}</Box>
                    </HStack>
                    <HStack>
                        <Box w={"25%"}>Funds locked:</Box>
                        <Box>{policy.locked}</Box>
                    </HStack>
                    <HStack>
                        <Box w={"25%"}>Funds used:</Box>
                        <Box>TODO</Box>
                    </HStack>
                </VStack>
            }
        </>
    );
})