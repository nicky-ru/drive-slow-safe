import React, {useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import { Container, Heading } from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import {useDispatch} from "react-redux";

import {getPartnerById} from "../../redux/actions/partner";
import {PartnerInfo} from "../../components/Partner/partnerInfo";

export const Partner = observer(() => {
    let { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPartnerById(slug));
    }, []);

    return(
        <Container>
            <Heading as={'h1'} size={'xl'} marginBottom={"1rem"}>Partner information</Heading>
            <PartnerInfo/>
        </Container>
    );
});
