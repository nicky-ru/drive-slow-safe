import React from 'react'
import { useSelector} from "react-redux";
import { observer } from 'mobx-react-lite';
import { Container, Center, Heading, Button, VStack } from '@chakra-ui/react';


export const Start = observer((props) => {
    const connected = useSelector((state => state.wallet.isConnected));

    return(
        <Container>
            <Center>
                <VStack>
                    <Heading
                        align={"center"}
                    >
                        Please connect metamask to proceed
                    </Heading>
                    {!connected &&
                    <Button onClick={props.handleConnect} id={"connect-button"}>Connect</Button>
                    }
                    <Button id={"connected-button"} hidden={true}>Connected</Button>
                </VStack>
            </Center>
        </Container>
    );
});
