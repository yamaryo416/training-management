import { memo, VFC } from 'react'
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'

import { useDeleteManySchedules } from '../../../hooks/queries/useDeleteManySchedules'
import { useDeleteSchedule } from '../../../hooks/queries/useDeleteSchedule'
import { useGetMyTeamTrainings } from '../../../hooks/queries/useGetMyTeamTrainings'
import { useControllModal } from '../../../hooks/useControllModal'
import { confirmScheduleDeleteModalState } from '../../../store/confirmScheduleDeleteModalState'
import { DeleteButton } from '../../atoms/button/DeleteButton'
import { ModalLayout } from '../layout/ModalLayout'

export const ConfirmScheduleDeleteModal: VFC = memo(() => {
  const { onCloseConfirmScheduleDeleteModal } = useControllModal()
  const { dataMyTeamTrainings } = useGetMyTeamTrainings()
  const { deleteSchedule } = useDeleteSchedule()
  const { deleteManySchedules } = useDeleteManySchedules()

  const confirmScheduleDeleteModal = useRecoilValue(
    confirmScheduleDeleteModalState
  )
  const { id, title, date, startDate, endDate, isOpen, isManySchedule } =
    confirmScheduleDeleteModal

  return (
    <ModalLayout
      title=""
      isOpen={isOpen}
      onClose={onCloseConfirmScheduleDeleteModal}
    >
      <Heading as="h3" fontSize="20px">
        以下のスケジュールを削除します。
        <br />
        よろしいですか？
      </Heading>
      {isManySchedule ? (
        <>
          <Heading fontSize="18px">期間:</Heading>
          <Flex>
            <Text data-testid="delete-schedule-period">{`${startDate} ~ ${endDate}`}</Text>
          </Flex>
          <Heading fontSize="18px">トレーニング名:</Heading>
          <Text data-testid="delete-schedule-title">
            {id !== ''
              ? dataMyTeamTrainings?.myTeamTrainings.edges?.map((train) => (
                  <>{train.node.id === id && train.node.title}</>
                ))
              : '指定なし'}
          </Text>
          <Box textAlign="center">
            <Button
              bg="red.600"
              color="white"
              data-testid="schedule-delete-button"
              onClick={() => {
                deleteManySchedules(startDate, endDate, id)
                onCloseConfirmScheduleDeleteModal()
              }}
            >
              削除
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Text data-testid="delete-schedule-date">日付: {date}</Text>
          <Text data-testid="delete-schedule-title">
            トレーニング名: {title}
          </Text>
          <Box textAlign="center">
            <DeleteButton
              name="schedule-delete"
              type="button"
              disabled={false}
              onClick={() => deleteSchedule(id!)}
            >
              削除
            </DeleteButton>
          </Box>
        </>
      )}
    </ModalLayout>
  )
})
