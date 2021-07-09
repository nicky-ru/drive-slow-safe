import React from 'react';
import {observer} from "mobx-react-lite";
import {VStack, HStack, Box, Text} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";

export const PartnerInfo = observer(() => {
    let { slug } = useParams();
    const partner = useSelector((state) => state.partner);

    return(
        <VStack align={"left"}>
            <HStack>
                <Box w={"25%"}>Partner ID:</Box>
                <Box maxWidth={"70%"}>
                    <Text isTruncated>{slug}</Text>
                </Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Name:</Box>
                <Box maxWidth={"70%"}><Text>{partner.name}</Text></Box>
            </HStack>
        </VStack>
    );
})