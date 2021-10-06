import 'moment/locale/ja'

import { memo, useMemo, VFC } from "react";
import { useRecoilValue } from "recoil";
import { Box, Heading, Stack, Text } from "@chakra-ui/layout";

import { useGetMyTeamFinishedSchedules } from "../../../hooks/queries/useGetMyTeamFinishedSchedules";
import { useGetMyTeamMember } from "../../../hooks/queries/useGetMyTeamMember";
import { useControllModal } from "../../../hooks/useControllModal";
import { finishedScheduleMemberListModalState } from "../../../store/finishedScheduleMemberListModalState";
import { CustomSpinner } from "../../atoms/spinner/CustomSpinner";
import { FailedText } from "../../atoms/text/FailedText";
import { FinishedScheduleMemberItem } from "../../molecules/FinishedScheduleMemberItem";
import { ModalLayout } from "../layout/ModalLayout";
import { Flex } from "@chakra-ui/react";
import moment from 'moment';

moment.locale('ja')

export const FinishedScheduleMemberListModal: VFC = memo(() => {
    const { loadingMyTeamFinishedSchedules, dataMyTeamFinishedSchedules, errorMyTeamFinishedSchedules } = useGetMyTeamFinishedSchedules()
    const { loadingMyTeamMember, dataMyTeamMember, errorMyTeamMember } = useGetMyTeamMember()

    const finishedScheduleMemberListModal = useRecoilValue(finishedScheduleMemberListModalState)

    const { isOpen, id, title, date } = finishedScheduleMemberListModal

    const scheduleFinishedMemberId = useMemo(() => 
        dataMyTeamFinishedSchedules?.myTeamFinishedSchedules.edges?.
            filter((fSche) => fSche.node.schedule.id === id ).
            map((fSche) => fSche.node.profile.id)
    , [dataMyTeamFinishedSchedules, finishedScheduleMemberListModal])

    const { onCloseFinishedScheduleMemberListModal } = useControllModal()

        
    return (
        <ModalLayout
            title="実施者リスト"
            isOpen={isOpen === "modal"}
            onClose={onCloseFinishedScheduleMemberListModal}
        >
            {loadingMyTeamFinishedSchedules || loadingMyTeamMember ? (
                <CustomSpinner />
            ): (
                <>
                    {(errorMyTeamFinishedSchedules || errorMyTeamMember) ? <FailedText /> : (
                        <Stack spacing={10}>
                            <Flex>
                                <Heading fontSize="16px">
                                    スケジュール: 
                                </Heading>
                                <Text pl={2}>
                                    {title}
                                </Text>
                            </Flex>
                            <Flex>
                                <Heading fontSize="16px">
                                    日付: 
                                </Heading>
                                <Text pl={2}>
                                    {moment(date).format('YYYY年M月D日(ddd)')}
                                </Text>
                            </Flex>
                            <Heading as="h4" fontSize="20px" textAlign="center">実施済み</Heading>
                            <Box>
                                {dataMyTeamMember?.myTeamMember.edges?.filter(({ node }) => scheduleFinishedMemberId!.includes(node.id)).
                                    map(({ node }) => (
                                        <FinishedScheduleMemberItem key={node.id} isFinished={true} nickname={node.nickname} />
                                    ))
                                }
                            </Box>
                            <Heading as="h4" fontSize="20px" textAlign="center">未実施</Heading>
                            <Box>
                                {dataMyTeamMember?.myTeamMember.edges?.filter((member) => !scheduleFinishedMemberId!.includes(member.node.id)).
                                    map(({ node }) => (
                                        <FinishedScheduleMemberItem isFinished={false} key={node.id} nickname={node.nickname} />
                                    ))
                                }
                            </Box>
                        </Stack>
                    )}
                </>
            )}
        </ModalLayout>

    )
})