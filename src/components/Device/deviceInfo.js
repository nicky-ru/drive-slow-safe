import React from 'react';
import {observer} from "mobx-react-lite";
import {VStack, HStack, Box, Text, Link} from '@chakra-ui/react';
import {Link as ReachLink, useParams} from 'react-router-dom';
import {useSelector} from "react-redux";

export const DeviceInfo = observer(() => {
    let { slug } = useParams();
    const device = useSelector((state) => state.device);

    const renderSwitch = (deviceStatus) => {
        switch (deviceStatus) {
            case "0":
                return <Text>Waiting Approval</Text>;
            case "1":
                return <Text>Whitelisted</Text>;
            case "2":
                return <Text>Blocked</Text>;
            default:
                return <Text>Unknown</Text>;
        }
    }

    return(
        <VStack align={"left"}>
            <HStack>
                <Box w={"25%"}>Device address:</Box>
                <Box maxWidth={"70%"}><Text isTruncated>{slug}</Text></Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Device IMEI:</Box>
                <Box maxWidth={"70%"}>
                    {device.imei ? <Text>{device.imei}</Text> : <Text>Empty</Text>}
                </Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Status:</Box>
                <Box>{renderSwitch(device.status)}</Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Has order:</Box>
                <Box>{device.hasOrder ? <Text>Yes</Text> : <Text>No</Text>}</Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Policy ID:</Box>
                <Box maxWidth={"70%"}>
                    <Link
                        as={ReachLink}
                        to={`/policy/${device.policyId}`}
                        params={{ policy: device.policyId }}>
                        {device.policyId ? <Text isTruncated>{device.policyId}</Text> : <Text>Empty</Text>}
                    </Link>
                </Box>
            </HStack>
        </VStack>
    );
})