import React from 'react'
import { observer } from 'mobx-react-lite';
import { Container, SimpleGrid, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';


export const User = observer(() => {
    return(
        <Container>
            <SimpleGrid minChildWidth="200px" spacing="10px" py="6">
                <LinkBox as="article" w="200px" p="4" borderWidth="1px" rounded="md" key={'/admin'}>
                    <LinkOverlay href={'/admin'} target="__blank">
                        <Text>{'Admin Panel'}</Text>
                    </LinkOverlay>
                </LinkBox>
                <LinkBox as="article" w="200px" p="4" borderWidth="1px" rounded="md" key={'user-panel'}>
                    <LinkOverlay href={'/user'} target="__blank">
                        <Text>{'User Panel'}</Text>
                    </LinkOverlay>
                </LinkBox>
            </SimpleGrid>
        </Container>
    );
});
