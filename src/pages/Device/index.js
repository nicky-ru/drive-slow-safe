import React, {useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import {useParams} from 'react-router-dom';
import {Container, Heading} from '@chakra-ui/layout';
import {useDispatch} from "react-redux";

import {getDeviceById} from "../../redux/actions/device";
import {DeviceInfo} from "../../components/Device/deviceInfo";

export const Device = observer(() => {
    let { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDeviceById(slug));
    }, []);

    return(
        <Container>
            <Heading as={'h1'} size={'xl'} marginBottom={"1rem"}>Device information</Heading>
            <DeviceInfo/>
        </Container>
    );
});
