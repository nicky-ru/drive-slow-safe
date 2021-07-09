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

export const PolicyModal = observer(() => {
    const currentAccount = useSelector((state) => state.wallet.address);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef();
    const [vehicleBrand, setVehicleBrand] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [vehicleYear, setVehicleYear] = useState('');
    const [deviceAddress, setDeviceAddress] = useState('');
    const [premium, setPremium] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();

        smartContract.methods.signPolicy(vehicleBrand, vehicleModel, vehicleYear, deviceAddress)
            .send({from: currentAccount, gas: 1000000, value:premium});
    }

    return(
        <>
            <Button onClick={onOpen}>
                <AddIcon w={6} h={6} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sign new policy</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form id={"device-form"} onSubmit={handleSubmit}/>
                        <FormControl>
                            <FormLabel>Vehicle brand</FormLabel>
                            <Input ref={initialRef} placeholder="Toyota" value={vehicleBrand}
                                   onChange={(e) => {setVehicleBrand(e.target.value)}}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Vehicle model</FormLabel>
                            <Input placeholder="Land Cruiser" value={vehicleModel}
                                   onChange={(e) => {setVehicleModel(e.target.value)}}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Vehicle year</FormLabel>
                            <Input placeholder="2010" value={vehicleYear}
                                   onChange={(e) => {setVehicleYear(e.target.value)}}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Device address</FormLabel>
                            <Input placeholder="0x..." value={deviceAddress}
                                   onChange={(e) => {setDeviceAddress(e.target.value)}}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Premium</FormLabel>
                            <Input placeholder="100000000000000000" value={premium}
                                   onChange={(e) => {setPremium(e.target.value)}}
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