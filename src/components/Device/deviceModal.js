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

export const DeviceModal = observer(() => {
    const currentAccount = useSelector((state) => state.wallet.address);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef();
    const [deviceAddress, setDeviceAddress] = useState('');
    const [deviceImei, setDeviceImei] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            smartContract.methods.approveDevice(deviceAddress, deviceImei).send({from: currentAccount, gas: 1000000});
        } catch (e) {
            // handle error
        }
    }

    return(
        <>
            <Button onClick={onOpen}>
                <AddIcon w={6} h={6} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Register new device</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form id={"device-form"} onSubmit={handleSubmit}/>
                        <FormControl>
                            <FormLabel>Device address</FormLabel>
                            <Input ref={initialRef} placeholder="0x..." value={deviceAddress}
                                   onChange={(e) => {setDeviceAddress(e.target.value)}}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>IMEI</FormLabel>
                            <Input placeholder="12345..." value={deviceImei}
                                   onChange={(e) => {setDeviceImei(e.target.value)}}
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