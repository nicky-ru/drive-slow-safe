import React from 'react';
import {observer} from "mobx-react-lite";
import {Box, Button, Link, Text, VStack} from '@chakra-ui/react';
import {useSelector} from "react-redux";
import {Link as ReachLink} from "react-router-dom";

export const HoldersList = observer(() => {
    const holdersIds = useSelector((state) => state.contract.holders);

    return(
        <VStack
            spacing={4}
            align="stretch"
        >
            {holdersIds.length > 0 && holdersIds.map((holderId) => (
                <Box key={holderId}
                     border={"1px"}
                     borderColor={"dark.100"}
                     borderRadius={16}
                     display="flex"
                     alignItems="center"
                     justifyContent="space-between">
                    <Text marginLeft={"10px"} isTruncated>{holderId}</Text>
                    <Link
                        as={ReachLink}
                        to={`/holder/${holderId}`}
                        params={{ holder: holderId }}>
                        <Button type={"button"}>View</Button>
                    </Link>
                </Box>
            ))}
            {holdersIds.length === 0 &&
            <Text>No registered holders</Text>
            }
        </VStack>
    );
});