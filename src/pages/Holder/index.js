import React, {useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import {useParams} from 'react-router-dom';
import { Container, Heading } from '@chakra-ui/layout';
import {useDispatch} from "react-redux";

import {getHolderById} from "../../redux/actions/holder";
import {HolderInfo} from "../../components/Holder/holderInfo";

export const Holder = observer(() => {
    let { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHolderById(slug));
    }, []);

    return(
        <Container>
            <Heading as={'h1'} size={'xl'} marginBottom={"1rem"}>Holder information</Heading>
            <HolderInfo/>
        </Container>
    );
});
