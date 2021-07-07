import React from 'react'
import { useSelector} from "react-redux";
import { observer } from 'mobx-react-lite';
import { Container, Center, Heading, Button, VStack } from '@chakra-ui/react';


export const Start = observer((props) => {
    return(
        <Container>
            <Center h={"90vh"}>
                <VStack>
                    <Heading
                        align={"center"}
                    >
                        Please connect metamask to proceed
                    </Heading>
                    <Button onClick={props.handleConnect} id={"connect-button"}>Connect</Button>
                </VStack>
            </Center>
        </Container>
    );
});
