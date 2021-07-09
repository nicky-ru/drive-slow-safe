import React from 'react';
import {observer} from "mobx-react-lite";
import {Container} from '@chakra-ui/react';
import {PartnersList} from "../../components/Partner/partnersList";

export const Partners = observer(() => {
    return(<Container><PartnersList/></Container>);
});