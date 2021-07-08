import React from 'react'
import { observer } from 'mobx-react-lite';
import { Container } from '@chakra-ui/react';
import {PolicyInfo} from "../../components/Policy/policyInfo";



export const Policy = observer(() => {
    return(
        <Container>
            <PolicyInfo/>
        </Container>
    );
});
