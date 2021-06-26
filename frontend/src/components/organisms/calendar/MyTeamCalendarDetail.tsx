import { VFC, memo } from "react"
import { Box, Flex, Link, Text } from "@chakra-ui/layout"
import { useRecoilValue } from "recoil"
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from "@chakra-ui/react";

import { scheduleOneDayState } from "../../../store/scheduleOneDayState"
import { useGetOneDaySchedules } from "../../../hooks/queries/useGetOneDaySchedules"
import { useGetMyProfile } from "../../../hooks/queries/useGetMyProfile";
import { CustomSpinner } from "../../atoms/spinner/CustomSpinner";
import { FailedText } from "../../atoms/text/FailedText";
import { TODAY } from "../../../../constants";
import { useNumber } from "../../../hooks/useNumber";
import { CalendarDetailMenubar } from "./CalendarDetailMenubar";
import { CalendarDetailContents } from "./CalendarDetailContents";
import { useControllModal } from "../../../hooks/useControllModal";

export const MyTeamCalendarDetail: VFC = memo(() => {
    const { dataMyProfile } = useGetMyProfile()
    const { loadingOnedaySchedules, dataOneDaySchedules, errorOneDaySchedules } = useGetOneDaySchedules()
    const { zeroNumber } = useNumber()
    const {
        onOpenConfirmScheduleDeleteModal,
    } = useControllModal()
 
    const oneDay = useRecoilValue(scheduleOneDayState)

    return (
       <Box textAlign="center">
           {loadingOnedaySchedules ? (
               <CustomSpinner />
           ): (
                <>
                    <CalendarDetailMenubar />
                    <Box py={7}>
                        {errorOneDaySchedules && <FailedText />}
                        {dataOneDaySchedules?.myTeamSchedules.edges?.map(({ node }) => (
                            <Box key={node.id} textAlign="left" mb={5}>
                                <Flex alignItems="center" >
                                    <CalendarDetailContents node={node} />
                                    {moment(oneDay).isBefore(moment(TODAY)) && (
                                        <Box pl={3}>
                                             {node.finishedSchedules.edges?.some(({ node }) => node.profile.id === dataMyProfile?.myProfile.id ) ? (
                                                <Text color='yellow' data-testid={node.id + '-previous-finished-text'}>実施！</Text>
                                            ):(
                                                <Text color='gray.400' data-testid={node.id + '-previous-not-finished-text'}>未実施</Text>
                                            )}
                                        </Box>
                                    )}
                                    {!dataMyProfile?.myProfile.isGuest && oneDay === TODAY && (
                                        <Box pl={3}>
                                            {node.finishedSchedules.edges?.some(({ node }) => node.profile.id === dataMyProfile?.myProfile.id ) ? (
                                                 <Link
                                                    color='yellow'
                                                    data-testid={node.id + '-finished-text'}
                                                    onClick={() => null}
                                                >
                                                    実施！
                                                </Link>
                                            ):(
                                                <Button
                                                    data-testid={node.id + '-schedule-finished-create-button'}
                                                    bg='blue.500'
                                                    h='30px'
                                                    onClick={() => null}
                                                >
                                                    実施する
                                                </Button>
                                            )}
                                        </Box>
                                    )}
                                    {dataMyProfile?.myProfile.isCoach && (
                                        <Box pl={7}>
                                            <DeleteIcon
                                                data-testid={node.id + '-schedule-delete-icon'}
                                                onClick={() => {
                                                    onOpenConfirmScheduleDeleteModal(
                                                        node.id,
                                                        node.training.title,
                                                        oneDay,
                                                        "",
                                                        "",
                                                        false
                                            )}}/>
                                        </Box> 
                                    )}
                                </Flex>
                                {dataMyProfile?.myProfile.isCoach && (
                                    <Flex pl={{ base: "40px", md: "60px" }} alignItems="center">
                                        <Text borderBottom="double 3px orange" data-testid={node.id + '-finished-count'}>
                                            {node.finishedCount}/{dataMyProfile?.myProfile.teamBoard.joinCount}人実施
                                        </Text>
                                        <Link
                                            display={{ base: "none", md: "inline"}}
                                            color="orange"
                                            pl={10}
                                            data-testid={node.id + '-finished-member-link'}
                                            onClick={() => null}
                                        >
                                            実施者一覧
                                        </Link>
                                        <Link 
                                            display={{ base: "inline", md: "none" }}
                                            color="orange"
                                            pl={10}
                                            onClick={() => null}
                                        >
                                            実施者一覧
                                        </Link>
                                    </Flex>
                                )}
                            </Box>
                        ))}
                        {dataOneDaySchedules?.myTeamSchedules.edges?.length === 0 && (
                            <Text>予定はありません。</Text>
                        )}
                    </Box>
                </>
            )}
       </Box>
    )
})

