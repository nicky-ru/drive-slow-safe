import React from 'react'
import { observer } from 'mobx-react-lite';
import { Container, SimpleGrid, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { ToolConfig } from "./tools";


export const Admin = observer(() => {
    return(
        <Container>
            <SimpleGrid minChildWidth="200px" spacing="10px" py="6">
                {ToolConfig.tools.map((i) => (
                    <LinkBox as="article" w="200px" p="4" borderWidth="1px" rounded="md" key={ToolConfig[i].name}>
                        <LinkOverlay href={ToolConfig[i].path} target="__self">
                            <Text>{ToolConfig[i].name}</Text>
                        </LinkOverlay>
                    </LinkBox>
                ))}
            </SimpleGrid>
        </Container>
    );
});
