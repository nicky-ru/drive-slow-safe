import React, {useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import { Container, Heading } from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import smartContract from '../../contract/driveSlowSafe';
import {useDispatch} from "react-redux";

import {getDataPoint} from "../../redux/actions/dataPoint";
import {DataPointInfo} from "../../components/DataPoint/dataPointInfo";

export const DataPoint = observer(() => {
    let { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            smartContract.methods.dataPoints(slug).call()
                .then((dataPoint) => {

                    dispatch(getDataPoint(dataPoint.latitude, dataPoint.longitude, dataPoint.timestamp));
                });
        } catch (e) {
            // handle error
        }

    }, []);

    return(
        <Container>
            <Heading as={'h1'} size={'xl'} marginBottom={"1rem"}>Datapoint information</Heading>
            <DataPointInfo/>
        </Container>
    );
});
