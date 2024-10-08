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
      <ModalContent color="black">
        <ModalHeader textAlign="center" data-testid="modal-title">
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody fontSize="15px">
          <Stack spacing={10}>{children}</Stack>
        </ModalBody>
        <ModalFooter>
          <SecondaryButton onClick={onClose}>戻る</SecondaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
})
