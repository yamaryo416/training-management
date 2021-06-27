import { memo, useEffect, VFC } from "react";
import { Box, Flex, Heading, Stack, Text, Link } from "@chakra-ui/layout";
import { useRecoilValue } from "recoil";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { useControllModal } from "../../../hooks/useControllModal";
import { oneMemberSelectedModalState } from "../../../store/oneMemberSelectedModalState";
import { ModalLayout } from "../layout/ModalLayout";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { DeleteButton } from "../../atoms/button/DeleteButton";
import { useGetMyTeamTrainings } from "../../../hooks/queries/useGetMyTeamTrainings";
import { TrainingIcon } from "../../molecules/TrainingIcon";
import { useGetOneMemberFinishedSchedules } from "../../../hooks/queries/useGetOneMemberFinishedSchedules";
import { CustomSpinner } from "../../atoms/spinner/CustomSpinner";
import { FailedText } from "../../atoms/text/FailedText";

export const OneMemberDetailModal: VFC = memo(() => {
    const oneMemberSelectedModal = useRecoilValue(oneMemberSelectedModalState)

    const { loadingMyTeamTrainings, dataMyTeamTrainings, errorMyTeamTrainings } = useGetMyTeamTrainings()
    const {
        getOneMemberFinishedSchedules,
        loadingOneMemberFinishedSchedules,
        dataOneMemberFinishedSchedules,
        errorOneMemberFinishedSchedules,
    } = useGetOneMemberFinishedSchedules()
    const {
        onOpenConfirmTeamLeaveModal,
        onOpenConfirmHandOffCoachModal,
        onCloseOneMemberSelected,
        onOpenTrainingImplementationModal
    } = useControllModal()
    
    useEffect(() => {
        oneMemberSelectedModal.isOpen && getOneMemberFinishedSchedules(oneMemberSelectedModal.id)
    }, [oneMemberSelectedModal])

    return (
        <ModalLayout
            title=""
            isOpen={oneMemberSelectedModal.isOpen}
            onClose={onCloseOneMemberSelected}
        >
            <Box textAlign="center">
                <AccountCircleIcon  style={{ fontSize: 100 }}/>
            </Box>
            <Heading as="h4" textAlign="center" fontSize="16px" mb={10}>{oneMemberSelectedModal.nickname}</Heading>
            {!oneMemberSelectedModal.isCoach && (
                <Stack spacing={5} mb={10}>
                    <Box textAlign="center">
                        <PrimaryButton
                            name='confirm-hando-off-coach'
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
                            name='confirmt-team-leave'
                            type="button"
                            disabled={false}
                            onClick={() => 
                                onOpenConfirmTeamLeaveModal(oneMemberSelectedModal.id, oneMemberSelectedModal.nickname, false)
                            }
                        >チームから脱退させる</DeleteButton>
                    </Box>
                </Stack>
            )}
            <Heading as="h4" textAlign="center" fontSize="16px">各トレーニングの実施状況</Heading>
            {loadingMyTeamTrainings || loadingOneMemberFinishedSchedules && <CustomSpinner />}
            {errorMyTeamTrainings || errorOneMemberFinishedSchedules ? (
                <FailedText />
            ):(
                <Box>
                    <Flex borderBottom="1px solid #718096">
                        <Box w="50px"></Box>
                        <Text w="200px">トレーニング</Text>
                        <Text>実施回数</Text>
                    </Flex>
                    <Stack spacing={2}>
                    {dataMyTeamTrainings?.myTeamTrainings.edges?.map((train) => (
                        <Box  key={train.node.id} borderBottom="1px solid #718096">
                            <Flex alignItems="center" py={2}>
                                <Box w="50px">
                                    <TrainingIcon iconNumber={train.node.iconNumber} color="black" size="50px" />
                                </Box>
                                <Text w="180px">
                                    {train.node.title}
                                </Text>
                                <Text w="50px" pl="20px">
                                    {dataOneMemberFinishedSchedules?.myTeamFinishedSchedules.edges?.
                                        filter((sche) => sche.node.training.id === train.node.id ).length}回
                                </Text>
                            </Flex>
                            <Link
                                color='orange.700'
                                pl='50px'
                                mb={3}
                                data-testid={`${train.node.id}-finished-implementation-list`}
                                onClick={() => {
                                    onOpenTrainingImplementationModal(
                                        train.node.id,
                                        train.node.title,
                                        train.node.finishedPatern
                                    )
                                }}
                            >
                                実施状況
                            </Link>
                        </Box>
                    ))}
                    </Stack>
                </Box>
            )}
         </ModalLayout> 
    )
})