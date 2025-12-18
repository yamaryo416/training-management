import { memo, ReactNode, VFC } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'

import { SecondaryButton } from '../../atoms/button/SecondaryButton'

type Props = {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const ModalLayout: VFC<Props> = memo((props) => {
  const { title, isOpen, onClose, children } = props

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      size="md"
    >
      <ModalOverlay />
      <ModalContent
        bg="white"
        color="gray.800"
        borderRadius="2xl"
        boxShadow="2xl"
        mx={4}
      >
        <ModalHeader
          textAlign="center"
          data-testid="modal-title"
          fontWeight="700"
          fontSize="xl"
          color="gray.800"
          borderBottom="1px"
          borderColor="gray.100"
          pb={4}
        >
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody fontSize="15px" py={6}>
          <Stack spacing={8}>{children}</Stack>
        </ModalBody>
        <ModalFooter borderTop="1px" borderColor="gray.100" pt={4}>
          <SecondaryButton onClick={onClose}>戻る</SecondaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
})
