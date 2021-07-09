import React, {useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import {useParams} from 'react-router-dom';
import smartContract from '../../contract/driveSlowSafe';
import { Container, Heading } from '@chakra-ui/react';
import {useDispatch} from "react-redux";

import {getHolder} from "../../redux/actions/holder";
import {HolderInfo} from "../../components/Holder/holderInfo";

export const Holder = observer(() => {
    let { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        smartContract.methods.holders(slug).call()
            .then((holder) => {
                dispatch(getHolder(holder.rating, holder.multiplier, holder.penaltyMultiplier, holder.accumulatedKM));
            });
    }, []);

    return(
        <Container>
            <Heading as={'h1'} size={'xl'} marginBottom={"1rem"}>Holder information</Heading>
            <HolderInfo/>
        </Container>
    );
});
