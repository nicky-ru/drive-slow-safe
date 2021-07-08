import React, {useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import {useParams} from 'react-router-dom';
import smartContract from '../../contract/driveSlowSafe';
import { Container, Heading } from '@chakra-ui/react';
import {useDispatch} from "react-redux";

import {getDevice} from "../../redux/actions/device";
import {DeviceInfo} from "../../components/Device/deviceInfo";

export const Device = observer(() => {
    let { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        smartContract.methods.devices(slug).call()
            .then((device) => {
                dispatch(getDevice(device.imei, device.hasOrder, device.status, device.policy));
            });
    }, []);

    return(
        <Container>
            <Heading as={'h1'} size={'xl'} marginBottom={"1rem"}>Device information</Heading>
            <DeviceInfo/>
        </Container>
    );
});
