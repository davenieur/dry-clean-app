import { Modal, Button, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalOverlay, Text } from '@chakra-ui/react';

export const ModifiableModal = ({ isOpen, onClose, modalHeader, onClick, modalBody }) => {

    return (
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
                    <Button colorScheme='green' onClick={ onClick }>{ modalHeader }</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
