import React, {useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import { Container, Heading } from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import smartContract from '../../contract/driveSlowSafe';
import {VehicleInfo} from "../../components/Vehicle/vehicleInfo";
import {useDispatch} from "react-redux";

import { getVehicle } from "../../redux/actions/vehicle";

export const Vehicle = observer(() => {
    let { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            smartContract.methods.vehicles(slug).call()
                .then((vehicle) => {
                    dispatch(getVehicle(vehicle.brand, vehicle.model, vehicle.year));
                });
        } catch (e) {
            // handle error
        }

    }, []);

    return(
        <Container>
            <Heading as={'h1'} size={'xl'} marginBottom={"1rem"}>Vehicle information</Heading>
            <VehicleInfo/>
        </Container>
    );
});
