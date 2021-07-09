import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {
    Button,
    FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure
} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import smartContract from "../../contract/driveSlowSafe";
import {useSelector} from "react-redux";

export const PartnerModal = observer(() => {
    const currentAccount = useSelector((state) => state.wallet.address);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef();
    const [partnerAddress, setPartnerAddress] = useState('');
    const [partnerName, setPartnerName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        smartContract.methods.registerPartner(partnerAddress, partnerName).send({from: currentAccount, gas: 1000000});
    }

    return(
        <>
            <Button onClick={onOpen}>
                <AddIcon w={6} h={6} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Register new partner</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form id={"device-form"} onSubmit={handleSubmit}/>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input ref={initialRef} placeholder="0x..." value={partnerAddress}
                                   onChange={(e) => {setPartnerAddress(e.target.value)}}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder="12345..." value={partnerName}
                                   onChange={(e) => {setPartnerName(e.target.value)}}
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