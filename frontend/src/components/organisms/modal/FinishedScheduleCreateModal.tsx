import { memo, VFC } from 'react'
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'

import { useControllModal } from '../../../hooks/useControllModal'
import { PrimaryButton } from '../../atoms/button/PrimaryButton'
import { ModalLayout } from '../layout/ModalLayout'
import { useRecoilValue } from 'recoil'
import { Formik } from 'formik'
import { CustomForm } from '../../molecules/CustomForm'
import { finishedScheduleCreateModalState } from '../../../store/finishedScheduleCreateModalState'
import { useCreateFinishedSchedule } from '../../../hooks/queries/useCreateFinishedSchedule'
import moment from 'moment'
import { useNumber } from '../../../hooks/useNumber'

export const FinishedScheduleCreateModal: VFC = memo(() => {
  const { onCloseFinishedScheduleCreateModal } = useControllModal()
  const { createFinishedSchedule } = useCreateFinishedSchedule()
  const { undefinedNumber } = useNumber()

  const finishedScheduleCreateModal = useRecoilValue(
    finishedScheduleCreateModalState
  )

  const { id, title, date, finishedPatern, isOpen } =
    finishedScheduleCreateModal

  return (
    <ModalLayout
      title="スケジュール実施"
      isOpen={isOpen}
      onClose={() => {
        onCloseFinishedScheduleCreateModal()
      }}
    >
      <Formik
        initialValues={{
          count: undefined,
          load: undefined,
          distance: undefined,
          minitus: undefined,
          comment: '',
        }}
        onSubmit={(values) => {
          createFinishedSchedule(
            id,
            undefinedNumber(values.count),
            undefinedNumber(values.load),
            undefinedNumber(values.distance),
            undefinedNumber(values.minitus),
            values.comment
          )
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Flex>
                <Heading fontSize="18px">スケジュール:</Heading>
                <Text pl={2} data-testid="finished-schedule-title">
                  {title}
                </Text>
              </Flex>
              <Flex>
                <Heading fontSize="18px">日付:</Heading>
                <Text pl={2} data-testid="finished-schedule-date">
                  {moment(date).format('YYYY年M月D日')}
                </Text>
              </Flex>
              {finishedPatern.includes('1') && (
                <CustomForm
                  name="count"
                  type="number"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.count}
                  placeholder=""
                >
                  回数
                </CustomForm>
              )}
              {finishedPatern.includes('2') && (
                <CustomForm
                  name="load"
                  type="number"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.load}
                  placeholder=""
                >
                  負荷(kg)
                </CustomForm>
              )}
              {finishedPatern.includes('3') && (
                <CustomForm
                  name="distance"
                  type="number"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.distance}
                  placeholder=""
                >
                  距離(km)
                </CustomForm>
              )}
              {finishedPatern.includes('4') && (
                <CustomForm
                  name="minitus"
                  type="number"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.minitus}
                  placeholder=""
                >
                  時間(分)
                </CustomForm>
              )}
              <CustomForm
                name="comment"
                type="text"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.comment}
                placeholder=""
              >
                コメント
              </CustomForm>
              <Box textAlign="center">
                <PrimaryButton
                  name="schedule-finished-create"
                  type="submit"
                  disabled={false}
                  onClick={() => null}
                >
                  スケジュールを実施
                </PrimaryButton>
              </Box>
            </Stack>
          </form>
        )}
      </Formik>
    </ModalLayout>
  )
})
