import { Modal, Button, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';

export const ModifiableModal = ({ modalHeader, onClick, modalBody, leftIcon, fontSize, colorScheme, buttonText }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onSubmit = () => {
        onClose()
        onClick()
    }

    return (
        <>
            <Button leftIcon={ leftIcon } colorScheme= { colorScheme } fontSize={ fontSize } onClick={ onOpen }>{ buttonText }</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader><Text>{ modalHeader }</Text></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        { modalBody }
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cerrar
                        </Button>
                        <Button colorScheme='green' onClick={ onSubmit }>{ buttonText }</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
