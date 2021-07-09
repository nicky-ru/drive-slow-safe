import React from 'react';
import {observer} from "mobx-react-lite";
import {VStack, HStack, Box, Text} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";

export const HolderInfo = observer(() => {
    let { slug } = useParams();
    const holder = useSelector((state) => state.holder);

    return(
        <VStack align={"left"}>
            <HStack>
                <Box w={"25%"}>Holder address:</Box>
                <Box maxWidth={"70%"}><Text isTruncated>{slug}</Text></Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Holder rating:</Box>
                <Box maxWidth={"70%"}>
                    <Text>{holder.rating}</Text>
                </Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Multiplier:</Box>
                <Box>{holder.multiplier}</Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Penalty Multiplier:</Box>
                <Box>{holder.penaltyMultiplier}</Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Accumulated KM:</Box>
                <Box>{holder.accumulatedKM}</Box>
            </HStack>
        </VStack>
    );
})