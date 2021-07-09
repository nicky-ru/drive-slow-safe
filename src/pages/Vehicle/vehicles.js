import React from 'react';
import {observer} from "mobx-react-lite";
import {Container} from '@chakra-ui/react';
import {VehiclesList} from "../../components/Vehicle/vehiclesList";

export const Vehicles = observer(() => {
    return(<Container><VehiclesList/></Container>);
});