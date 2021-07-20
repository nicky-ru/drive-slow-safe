import React, {useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import { Container, Heading } from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import {useDispatch} from "react-redux";

import {getDataPointById} from "../../redux/actions/dataPoint";
import {DataPointInfo} from "../../components/DataPoint/dataPointInfo";

export const DataPoint = observer(() => {
    let { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDataPointById(slug));
    }, []);

    return(
        <Container>
            <Heading as={'h1'} size={'xl'} marginBottom={"1rem"}>Datapoint information</Heading>
            <DataPointInfo/>
        </Container>
    );
});
