import React from 'react';
import {observer} from "mobx-react-lite";
import {VStack, HStack, Box, Text, AspectRatio} from '@chakra-ui/react';
import {useSelector} from "react-redux";

export const DataPointInfo = observer(() => {
    const datapoint = useSelector((state) => state.dataPoint);

    return(
        <VStack align={"left"}>
            {/*<HStack>*/}
            {/*    <Box w={"25%"}>Accelerometer info:</Box>*/}
            {/*    <Box maxWidth={"70%"}><Text isTruncated>{datapoint.accelerometer}</Text></Box>*/}
            {/*</HStack>*/}
            <HStack>
                <Box w={"25%"}>Latitude:</Box>
                <Box maxWidth={"70%"}><Text>{datapoint.latitude}</Text></Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Longitude:</Box>
                <Box><Text>{datapoint.longitude}</Text></Box>
            </HStack>
            <HStack>
                <Box w={"25%"}>Timestamp:</Box>
                <Box><Text>{datapoint.timestamp}</Text></Box>
            </HStack>
            <AspectRatio ratio={16 / 9}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng"
                    alt="demo"
                />
            </AspectRatio>
        </VStack>
    );
})