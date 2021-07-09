import React from 'react';
import {observer} from "mobx-react-lite";
import {Box, Button, Link, Text, VStack} from '@chakra-ui/react';
import {useSelector} from "react-redux";
import {Link as ReachLink} from "react-router-dom";

export const VehiclesListAdmin = observer(() => {
    const vehicleIds = useSelector((state) => state.contract.vehicles);

    return(
        <VStack
            spacing={4}
            align="stretch"
        >
            {vehicleIds.length > 0 && vehicleIds.map((vehicleId) => (
                <Box key={vehicleId}
                     border={"1px"}
                     borderColor={"dark.100"}
                     borderRadius={16}
                     display="flex"
                     alignItems="center"
                     justifyContent="space-between">
                    <Text marginLeft={"10px"} isTruncated>{vehicleId}</Text>
                    <Link
                        as={ReachLink}
                        to={`/vehicle/${vehicleId}`}
                        params={{ vehicle: vehicleId }}>
                        <Button type={"button"}>View</Button>
                    </Link>
                </Box>
            ))}
            {vehicleIds.length === 0 &&
            <Text>No registered vehicles</Text>
            }
        </VStack>
    );
});