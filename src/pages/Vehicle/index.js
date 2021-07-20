import React, {useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import { Container, Heading } from '@chakra-ui/layout';
import {useParams} from 'react-router-dom';
import {VehicleInfo} from "../../components/Vehicle/vehicleInfo";
import {useDispatch} from "react-redux";

import { getVehicleById } from "../../redux/actions/vehicle";

export const Vehicle = observer(() => {
    let { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVehicleById(slug));
    }, []);

    return(
        <Container>
            <Heading as={'h1'} size={'xl'} marginBottom={"1rem"}>Vehicle information</Heading>
            <VehicleInfo/>
        </Container>
    );
});
