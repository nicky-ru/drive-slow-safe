import React, {useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import {useParams} from 'react-router-dom';
import { Container, Heading } from '@chakra-ui/layout';
import {PolicyInfo} from "../../components/Policy/policyInfo";
import {useDispatch} from "react-redux";

import { getPolicyById } from "../../redux/actions/policy";

export const Policy = observer(() => {
    let { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPolicyById(slug));
    }, []);

    return(
        <Container>
            <Heading as={'h1'} size={'xl'} marginBottom={"1rem"}>Policy information</Heading>
            <PolicyInfo/>
        </Container>
    );
});
