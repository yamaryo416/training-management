import { memo, useEffect, VFC } from "react";
import { Box, Flex, Heading, Stack, Text, Link, Center } from "@chakra-ui/layout";
import { useRecoilValue } from "recoil";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { useGetMyProfile } from "../../hooks/queries/useGetMyProfile";
import { SectionTitle } from "../atoms/title/SectionTitle";
import { SectionCard } from "../organisms/layout/SectionCard";
import { useGetMyTeamTrainings } from "../../hooks/queries/useGetMyTeamTrainings";
import { Spinner } from "@chakra-ui/spinner";
import { TrainingIcon } from "../molecules/TrainingIcon";
import { CustomSpinner } from "../atoms/spinner/CustomSpinner";
import { FailedText } from "../atoms/text/FailedText";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { DeleteButton } from "../atoms/button/DeleteButton";
import { oneMemberSelectedModalState } from "../../store/oneMemberSelectedModalState";
import { TrainingImplementationModal } from "../organisms/modal/TrainingImplementationModal";
import { useGetOneMemberFinishedSchedules } from "../../hooks/queries/useGetOneMemberFinishedSchedules";
import { useControllModal } from "../../hooks/useControllModal";

export const MyTeamMemberDetailSection: VFC = memo(() => {
    const { dataMyProfile } = useGetMyProfile()
    const { loadingMyTeamTrainings, dataMyTeamTrainings, errorMyTeamTrainings } = useGetMyTeamTrainings()
    const { onOpenConfirmTeamLeaveModal, onOpenConfirmHandOffCoachModal } = useControllModal()
    const {
        loadingOneMemberFinishedSchedules,
        dataOneMemberFinishedSchedules,
        getOneMemberFinishedSchedules,
    } = useGetOneMemberFinishedSchedules()

    const oneMemberSelectedModal  = useRecoilValue(oneMemberSelectedModalState)

    useEffect(() => {
        oneMemberSelectedModal.id === '' ?
            getOneMemberFinishedSchedules(dataMyProfile?.myProfile.id!)
        :
            getOneMemberFinishedSchedules(oneMemberSelectedModal.id)
    }, [oneMemberSelectedModal])

    if (loadingMyTeamTrainings) return <Spinner />

    return (
        <SectionCard width="450px">
            <SectionTitle>メンバー詳細</SectionTitle>
            {loadingOneMemberFinishedSchedules ? (
                <CustomSpinner />
            ):(
                <>
                    { errorMyTeamTrainings && <FailedText />}
                    <Box textAlign="center">
                        <AccountCircleIcon  style={{ fontSize: 100 }}/>
                    </Box>
                    <Heading textAlign="center" fontSize="20px" mb={10} data-testid='one-member-detail-nickname'>
                        {oneMemberSelectedModal.nickname || dataMyProfile?.myProfile.nickname}
                    </Heading>
                    {!oneMemberSelectedModal.isCoach && (
                        <Stack spacing={5} mb={10}>
                            <Box textAlign="center">
                                <PrimaryButton
                                    name='confirm-hand-off-coach'
                                    type="button"
                                    disabled={false}
                                    onClick={() => 
                                        onOpenConfirmHandOffCoachModal(oneMemberSelectedModal.id, oneMemberSelectedModal.nickname)
                                    }
                                >
                                    コーチ権限を委譲する
                                </PrimaryButton>
                            </Box>
                            <Box textAlign="center">
                                <DeleteButton
                                    name='confirm-team-leave'
                                    type='button'
                                    disabled={false}
                                    onClick={() => 
                                        onOpenConfirmTeamLeaveModal(oneMemberSelectedModal.id, oneMemberSelectedModal.nickname, false)
                                    }
                                >
                                    チームから脱退させる
                                </DeleteButton>
                            </Box>
                        </Stack>
                    ) }
                    <SectionTitle>各トレーニングの実施回数</SectionTitle>
                    <Flex borderBottom="1px solid #718096">
                        <Box w="50px"></Box>
                        <Text>トレーニング</Text>
                        <Text pl= "160px">実施回数</Text>
                    </Flex>
                    {dataMyTeamTrainings?.myTeamTrainings.edges.length === 0 && <Center mt={10}>トレーニングはありません。</Center>}
                    {dataMyTeamTrainings?.myTeamTrainings.edges?.map((train) => (
                        <Box key={train.node.id} borderBottom="1px solid #718096" py={3}>
                            <Flex alignItems="center">
                                <Box w="50px">
                                    <TrainingIcon iconNumber={train.node.iconNumber} color="white" size="40px" />
                                </Box>
                                <Text w="250px" data-testid={train.node.id + '-training-contents'}>
                                    {train.node.title}
                                </Text>
                                <Text w="50px" pl="10px" data-testid={train.node.id + '-finished-count'}>
                                    {dataOneMemberFinishedSchedules?.myTeamFinishedSchedules.edges?.
                                        filter((sche) => sche.node.training.id === train.node.id ).length}回
                                </Text>
                            </Flex>
                        </Box>
                    ))}
                    <TrainingImplementationModal finishedSchedules={dataOneMemberFinishedSchedules.myTeamFinishedSchedules} />
                </>
            )}
        </SectionCard>
    )
})