import { memo, VFC } from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'

import { useControllModal } from '../../../hooks/useControllModal'
import { DeleteButton } from '../../atoms/button/DeleteButton'
import { ModalLayout } from '../layout/ModalLayout'
import { confirmFinishedScheduleDeleteModalState } from '../../../store/confirmFinishedScheduleDeleteModalState'
import moment from 'moment'
import { useDeleteFinishedSchedule } from '../../../hooks/queries/useDeleteFinishedSchedule'

export const ConfirmFinishedScheduleDeleteModal: VFC = memo(() => {
  const { deleteFinishedSchedule } = useDeleteFinishedSchedule()
  const { onCloseConfirmFinishedScheduleDeleteModal } = useControllModal()

  const confirmFinishedScheduleDeleteModal = useRecoilValue(
    confirmFinishedScheduleDeleteModalState
  )
  const { id, title, date, isOpen } = confirmFinishedScheduleDeleteModal

  return (
    <ModalLayout
      title=""
      isOpen={isOpen}
      onClose={onCloseConfirmFinishedScheduleDeleteModal}
    >
      <Heading as="h3" fontSize="20px">
        以下のスケジュール実施を取り消します。
        <br />
        よろしいですか？
      </Heading>
      <Flex>
        <Heading fontSize="18px">スケジュール:</Heading>
        <Text
          pl={2}
          fontSize="16px"
          data-testid="finished-schedule-delete-title"
        >
          {title}
        </Text>
      </Flex>
      <Flex>
        <Heading fontSize="18px">日付:</Heading>
        <Text
          pl={2}
          fontSize="16px"
          data-testid="finished-schedule-delete-date"
        >
          {moment(date).format('YYYY年M月D日')}
        </Text>
      </Flex>
      <Box textAlign="center">
        <DeleteButton
          name="finished-schedule-delete"
          type="button"
          disabled={false}
          onClick={() => {
            deleteFinishedSchedule(id)
          }}
        >
          実施を取り消す
        </DeleteButton>
      </Box>
    </ModalLayout>
  )
})
