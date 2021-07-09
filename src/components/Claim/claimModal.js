import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {
    Button,
    FormControl, FormLabel, Input,
    Modal, Text,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import smartContract from "../../contract/driveSlowSafe";
import {useSelector} from "react-redux";

export const ClaimModal = observer((props) => {
    const currentAccount = useSelector((state) => state.wallet.address);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef();
    const [partnerAddress, setPartnerAddress] = useState('');
    const [claim, setClaim] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();

        let userPays = claim * 0.1;

        smartContract.methods.payRepair(partnerAddress, props.policyId)
            .send({from: currentAccount, gas: 1000000, value: userPays});
    }

    return(
        <>
            <Button onClick={onOpen}>
                <Text>Claim</Text>
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Claim funds</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form id={"device-form"} onSubmit={handleSubmit}/>
                        <FormControl>
                            <FormLabel>Partner address</FormLabel>
                            <Input ref={initialRef} placeholder="0x..." value={partnerAddress}
                                   onChange={(e) => {setPartnerAddress(e.target.value)}}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Claim</FormLabel>
                            <Input placeholder="100000000000000000" value={claim}
                                   onChange={(e) => {setClaim(e.target.value)}}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>Close</Button>
                        <Button type={"submit"} colorScheme="blue" mr={3} form={"device-form"} onClick={onClose}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
})