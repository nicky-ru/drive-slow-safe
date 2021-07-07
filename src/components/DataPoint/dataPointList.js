import React from "react";
import {Box, Button, Link, Text, VStack} from '@chakra-ui/react';
import {observer} from "mobx-react-lite";
import {useSelector} from "react-redux";

export const DataPointList = observer(() => {
    const penalties = useSelector((state) => state.user.penalties);

    return (
        <VStack
            spacing={4}
            align="stretch"
        >
            {penalties.map((penalty) => (
                <Box key={penalty}
                     border={"1px"}
                     borderColor={"dark.100"}
                     borderRadius={16}
                     display="flex"
                     alignItems="center"
                     justifyContent="space-between">
                    <Text marginLeft={"10px"}>{penalty}</Text>
                    <Link href={`/data_point/${penalty}`} params={{ data_point: penalty }}><Button type={"button"}>View</Button></Link>
                </Box>
            ))}
            {penalties.length === 0 &&
                <Text>You have no penalties yet</Text>
            }
        </VStack>
    );
});
