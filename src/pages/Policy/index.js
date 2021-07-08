import React, {useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import {useParams} from 'react-router-dom';
import smartContract from '../../contract/driveSlowSafe';
import { Container, Heading } from '@chakra-ui/react';
import {PolicyInfo} from "../../components/Policy/policyInfo";
import {useDispatch} from "react-redux";

import { getPolicy } from "../../redux/actions/policy";

export const Policy = observer(() => {
    let { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        smartContract.methods.policies(slug).call()
            .then((policy) => {
                dispatch(getPolicy(
                    policy.isActive, policy.policyHolder, policy.car,
                    policy.device, policy.premium, policy.locked
                ));
            });
    }, []);

    return(
        <Container>
            <Heading as={'h1'} size={'xl'} marginBottom={"1rem"}>Policy information</Heading>
            <PolicyInfo/>
        </Container>
    );
});
