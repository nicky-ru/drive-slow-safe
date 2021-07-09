import React from 'react';
import {VStack, Box, Text, Link, Button} from '@chakra-ui/react';
import {Link as ReachLink} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {useSelector} from "react-redux";
import {DeviceModal} from "./deviceModal";

export const DevicesListAdmin = observer(() => {
    const deviceIds = useSelector((state) => state.contract.devices);

    return(
        <VStack
            spacing={4}
            align="stretch"
        >
            {deviceIds.length > 0 && deviceIds.map((deviceId) => (
                <Box key={deviceId}
                     border={"1px"}
                     borderColor={"dark.100"}
                     borderRadius={16}
                     display="flex"
                     alignItems="center"
                     justifyContent="space-between">
                    <Text marginLeft={"10px"} isTruncated>{deviceId}</Text>
                    <Link
                        as={ReachLink}
                        to={`/device/${deviceId}`}
                        params={{ device: deviceId }}>
                        <Button type={"button"}>View</Button>
                    </Link>
                </Box>
            ))}
            {deviceIds.length === 0 &&
            <Text>No registered devices</Text>
            }
            <DeviceModal/>
        </VStack>
    );
})