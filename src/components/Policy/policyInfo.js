import React from 'react';
import {observer} from "mobx-react-lite";
import {VStack, HStack, Box, Text, Link} from '@chakra-ui/react';
import {Link as ReachLink, useParams} from 'react-router-dom';
import {useSelector} from "react-redux";

export const PolicyInfo = observer(() => {
    let { slug } = useParams();
    const policy = useSelector((state) => state.policy);

    return(
        <VStack align={"left"}>
            <HStack>
                <Box w={"25%"}>Policy ID:</Box>
                <Box maxWidth={"70%"}><Text isTruncated>{slug}</Text></Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Status:</Box>
                <Box>{policy.status ? <Text>Active</Text> : <Text>Not active</Text>}</Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Policy Holder ID:</Box>
                <Box maxWidth={"70%"}>
                    <Link
                        as={ReachLink}
                        to={`/user`}>
                        <Text isTruncated>{policy.holderId}</Text>
                    </Link>
                </Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Vehicle ID:</Box>
                <Box maxWidth={"70%"}>
                    <Link
                        as={ReachLink}
                        to={`/vehicle/${policy.vehicleId}`}
                        params={{ vehicle: policy.vehicleId }}>
                        <Text isTruncated>{policy.vehicleId}</Text>
                    </Link>
                </Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Device ID:</Box>
                <Box maxWidth={"70%"}>
                    <Link
                        as={ReachLink}
                        to={`/device/${policy.deviceId}`}
                        params={{ device: policy.deviceId }}>
                        <Text isTruncated>{policy.deviceId}</Text>
                    </Link>
                </Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Premium:</Box>
                <Box>{policy.premium}</Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Funds locked:</Box>
                <Box>{policy.lockedFunds}</Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Funds used:</Box>
                <Box>TODO</Box>
            </HStack>
        </VStack>
    );
})