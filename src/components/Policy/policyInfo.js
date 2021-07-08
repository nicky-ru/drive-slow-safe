import React from 'react';
import {observer} from "mobx-react-lite";
import {VStack, HStack, Box, Text, Button, Link} from '@chakra-ui/react';
import {Link as ReachLink, useParams} from 'react-router-dom';
import {useSelector} from "react-redux";

export const PolicyInfo = observer(() => {
    let { slug } = useParams();
    const policy = useSelector((state) => state.policy[slug]);

    return(
        <>
            {policy &&
                <VStack align={"left"}>
                    <HStack>
                        <Box w={"25%"}>Status:</Box>
                        <Box>{policy.isActive ? <Text>Active</Text> : <Text>Not active</Text>}</Box>
                    </HStack>
                    <HStack>
                        <Box w={"25%"}>Policy Holder ID:</Box>
                        <Box maxWidth={"70%"}>
                            <Link
                                as={ReachLink}
                                to={`/user`}>
                                <Text isTruncated>{policy.policyHolder}</Text>
                            </Link>
                        </Box>
                    </HStack>
                    <HStack>
                        <Box w={"25%"}>Vehicle ID:</Box>
                        <Box maxWidth={"70%"}>
                            <Link
                                as={ReachLink}
                                to={`/vehicle/${policy.car}`}
                                params={{ vehicle: policy.car }}>
                                <Text isTruncated>{policy.car}</Text>
                            </Link>
                        </Box>
                    </HStack>
                    <HStack>
                        <Box w={"25%"}>Device ID:</Box>
                        <Box maxWidth={"70%"}>
                            <Link
                                as={ReachLink}
                                to={`/device/${policy.device}`}
                                params={{ device: policy.device }}>
                                <Text isTruncated>{policy.device}</Text>
                            </Link>
                        </Box>
                    </HStack>
                    <HStack>
                        <Box w={"25%"}>Premium:</Box>
                        <Box>{policy.premium}</Box>
                    </HStack>
                    <HStack>
                        <Box w={"25%"}>Funds locked:</Box>
                        <Box>{policy.locked}</Box>
                    </HStack>
                    <HStack>
                        <Box w={"25%"}>Funds used:</Box>
                        <Box>TODO</Box>
                    </HStack>
                </VStack>
            }
        </>
    );
})