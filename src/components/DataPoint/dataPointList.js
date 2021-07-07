import React from "react";
import {Box, Button, Link, Text, VStack} from '@chakra-ui/react';
import {observer} from "mobx-react-lite";
import {useSelector} from "react-redux";

export const DataPointList = observer(() => {
    const penaltyIds = useSelector((state) => state.user.penalties);
    const penalties = useSelector((state) => state.penalty);

    return (
        <VStack
            spacing={4}
            align="stretch"
        >
            {penalties[penaltyIds[0]] && penaltyIds.map((penaltyId) => (
                <Box key={penaltyId}
                     border={"1px"}
                     borderColor={"dark.100"}
                     borderRadius={16}
                     display="flex"
                     alignItems="center"
                     justifyContent="space-between">
                    <Text marginLeft={"10px"}>{penalties[penaltyId].timestamp}</Text>
                    <Link href={`/data_point/${penaltyId}`} params={{ data_point: penaltyId }}><Button type={"button"}>View</Button></Link>
                </Box>
            ))}
            {penaltyIds.length === 0 &&
                <Text>You have no penalties yet</Text>
            }
        </VStack>
    );
});
