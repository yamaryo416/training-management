import { memo, VFC } from 'react'
import { Box, Heading, Text, Flex } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'

import { useDeleteTraining } from '../../../hooks/queries/useDeleteTraining'
import { useControllModal } from '../../../hooks/useControllModal'
import { confirmTrainingDeleteModalState } from '../../../store/confirmTrainingDeleteModalState'
import { DeleteButton } from '../../atoms/button/DeleteButton'
import { ModalLayout } from '../layout/ModalLayout'

export const ConfirmTrainingDeleteModal: VFC = memo(() => {
  const { onCloseConfirmTrainingDeleteModal } = useControllModal()
  const { deleteTraining } = useDeleteTraining()

  const confirmTrainingDeleteModal = useRecoilValue(
    confirmTrainingDeleteModalState
  )

  const { id, title, description, isOpen } = confirmTrainingDeleteModal

  return (
    <ModalLayout
      title=""
      isOpen={isOpen}
      onClose={onCloseConfirmTrainingDeleteModal}
    >
      <Heading as="h3" fontSize="20px">
        以下のトレーニングを削除します。
        <br />
        よろしいですか？
      </Heading>
      <Flex>
        <Heading fontSize="18px">トレーニング名:</Heading>
        <Text pl={2} fontSize="16px" data-testid="delete-training-title">
          {title}
        </Text>
      </Flex>
      {description !== '' && (
        <Flex>
          <Heading fontSize="18px">説明:</Heading>
          <Text
            pl={2}
            fontSize="16px"
            data-testid="delete-training-description"
          >
            {description}
          </Text>
        </Flex>
      )}
      <Box textAlign="center">
        <DeleteButton
          name="training-delete"
          type="button"
          disabled={false}
          onClick={() => {
            deleteTraining(id)
            onCloseConfirmTrainingDeleteModal()
          }}
        >
          削除
        </DeleteButton>
      </Box>
    </ModalLayout>
  )
})
