import 'moment/locale/ja'

import { memo, useMemo, VFC } from 'react'
import { Box, Flex, Stack, Text, Heading } from '@chakra-ui/react'
import moment from 'moment'
import { useRecoilValue } from 'recoil'

import { useGetMyTeamFinishedSchedules } from '../../hooks/queries/useGetMyTeamFinishedSchedules'
import { finishedScheduleMemberListModalState } from '../../store/finishedScheduleMemberListModalState'
import { SectionTitle } from '../atoms/title/SectionTitle'
import { SectionCard } from '../organisms/layout/SectionCard'
import { useGetMyTeamMember } from '../../hooks/queries/useGetMyTeamMember'
import { FailedText } from '../atoms/text/FailedText'
import { CustomSpinner } from '../atoms/spinner/CustomSpinner'
import { FinishedScheduleMemberItem } from '../molecules/FinishedScheduleMemberItem'

moment.locale('ja')

export const FinishedScheduleMemberSection: VFC = memo(() => {
  const finishedScheduleMemberListModal = useRecoilValue(
    finishedScheduleMemberListModalState
  )
  const {
    loadingMyTeamFinishedSchedules,
    dataMyTeamFinishedSchedules,
    errorMyTeamFinishedSchedules,
  } = useGetMyTeamFinishedSchedules()
  const { loadingMyTeamMember, dataMyTeamMember, errorMyTeamMember } =
    useGetMyTeamMember()

  const { id, title, date } = finishedScheduleMemberListModal

  const scheduleFinishedMemberId = useMemo(
    () =>
      dataMyTeamFinishedSchedules?.myTeamFinishedSchedules.edges
        ?.filter(({ node }) => node.schedule.id === id)
        .map(({ node }) => node.profile.id),
    [dataMyTeamFinishedSchedules, finishedScheduleMemberListModal]
  )

  return (
    <SectionCard width="350px">
      <SectionTitle>スケジュール実施者リスト</SectionTitle>
      {loadingMyTeamFinishedSchedules || loadingMyTeamMember ? (
        <CustomSpinner />
      ) : (
        <>
          {(errorMyTeamFinishedSchedules || errorMyTeamMember) && (
            <FailedText />
          )}
          <Stack spacing={5} mb={10}>
            <Flex>
              <Heading fontSize="18px">スケジュール:</Heading>
              <Text pl={3} data-testid="selected-schedule-finished-title">
                {title}
              </Text>
            </Flex>
            <Flex>
              <Heading fontSize="18px">日付:</Heading>
              <Text pl={3} data-testid="selected-schedule-finished-date">
                {moment(date).format('YYYY年M月D日(ddd)')}
              </Text>
            </Flex>
          </Stack>
          <SectionTitle>実施済み</SectionTitle>
          <Box mb={10}>
            {dataMyTeamMember?.myTeamMember.edges
              ?.filter(({ node }) =>
                scheduleFinishedMemberId!.includes(node.id)
              )
              .map(({ node }) => (
                <Box key={node.id}>
                  <FinishedScheduleMemberItem
                    nickname={node.nickname}
                    isFinished={true}
                  />
                </Box>
              ))}
          </Box>
          <SectionTitle>未実施</SectionTitle>
          <Box>
            {dataMyTeamMember?.myTeamMember.edges
              ?.filter(
                ({ node }) => !scheduleFinishedMemberId!.includes(node.id)
              )
              .map(({ node }) => (
                <Box key={node.id}>
                  <FinishedScheduleMemberItem
                    nickname={node.nickname}
                    isFinished={false}
                  />
                </Box>
              ))}
          </Box>
        </>
      )}
    </SectionCard>
  )
})
