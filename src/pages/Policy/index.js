import React from 'react'
import { observer } from 'mobx-react-lite';
import { Container, Heading } from '@chakra-ui/react';
import {PolicyInfo} from "../../components/Policy/policyInfo";

export const Policy = observer(() => {
    return(
        <Container>
            <Heading as={'h1'} size={'xl'} marginBottom={"1rem"}>Policy information</Heading>
            <PolicyInfo/>
        </Container>
    );
});
