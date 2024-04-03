import React from 'react'
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, useDisclosure } from '@chakra-ui/react'

export const ModifiableAlert = ({ leftIcon, fontSize, buttonText, dialogBody, onClick, param }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const onSubmit = () => {
        onClose()
        onClick(param)
    }

    return (
        <>
            <Button colorScheme='red' fontSize={ fontSize }  leftIcon={ leftIcon } onClick={onOpen} w="20rem">
                { buttonText }
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        { buttonText }
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        { dialogBody }
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button colorScheme='red' onClick={onSubmit} ml={3}>
                        { buttonText }
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
