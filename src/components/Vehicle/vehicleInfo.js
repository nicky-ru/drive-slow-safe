import React from 'react';
import {observer} from "mobx-react-lite";
import {VStack, HStack, Box, Text} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";

export const VehicleInfo = observer(() => {
    let { slug } = useParams();
    const vehicle = useSelector((state) => state.vehicle);

    return(
        <VStack align={"left"}>
            <HStack>
                <Box w={"25%"}>Vehicle ID:</Box>
                <Box maxWidth={"70%"}>
                    <Text isTruncated>{slug}</Text>
                </Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Brand:</Box>
                <Box maxWidth={"70%"}><Text>{vehicle.brand}</Text></Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Model:</Box>
                <Box maxWidth={"70%"}>
                    <Text>{vehicle.model}</Text>
                </Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Year:</Box>
                <Box>{vehicle.year}</Box>
            </HStack>
        </VStack>
    );
})