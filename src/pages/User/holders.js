import React from 'react';
import {observer} from "mobx-react-lite";
import {Container} from '@chakra-ui/react';
import {HoldersList} from "../../components/User/holdersList";

export const Holders = observer(() => {
    return(<Container><HoldersList/></Container>);
});