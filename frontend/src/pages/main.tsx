import { memo, VFC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex, Box } from '@chakra-ui/layout'

import { useGetMyProfile } from '../hooks/queries/useGetMyProfile'
import { useMessage } from '../hooks/useMessage'
import { CustomSpinner } from '../components/atoms/spinner/CustomSpinner'
import { FailedText } from "../components/atoms/text/FailedText";
import { HeadTitle } from '../components/atoms/title/HeadTitle'
import { MyTeamCalendarSection } from '../components/templates/MyTeamCalendarSection'
import { HeaderForAuthUser } from '../components/templates/HeaderForAuthUser'
import { MainMenubar } from '../components/templates/MainMenubar'
import { ModalSection } from '../components/templates/ModalSection'
import { MyTeamTrainingSection } from '../components/templates/MyTeamTrainingSection'
import { TeamBoardSection } from '../components/templates/TeamBoardSection'
import { FinishedScheduleLogsSection } from '../components/templates/FinishedScheduleLogsSection'

const Main: VFC = memo(() => {
    const router = useRouter()
    const { showMessage } = useMessage()
    const { loadingMyProfile, errorMyProfile, dataMyProfile } = useGetMyProfile()

    useEffect(() => {
        if (errorMyProfile) {
            localStorage.removeItem('token')
        }
        if (!localStorage.getItem('token')) {
            router.push('/')
            showMessage({ title: 'ログインしてください。', status: 'error'})
        }
    }, [])

    if (loadingMyProfile) return <CustomSpinner />
    else if (errorMyProfile) return <FailedText />

    return (
        <>
            <HeadTitle title='マイページ' />
            <HeaderForAuthUser
                title='マイページ'
                nickname={dataMyProfile?.myProfile?.nickname!}
                myTeamBoard={dataMyProfile?.myProfile.teamBoard}
                isMyTeamPage={true}
                isCoach={dataMyProfile?.myProfile.isCoach!}
                isGuest={dataMyProfile?.myProfile.isGuest!}
            />
            <Flex>
                <MainMenubar
                    isJoinTeam={dataMyProfile?.myProfile.teamBoard !== null}
                    isCoach={dataMyProfile?.myProfile.isCoach!}
                    isMyTeamPage={true}
                    isGuest={dataMyProfile?.myProfile.isGuest!}
                />
                <Box mt='150px'>
                    <Flex flexWrap="wrap">
                        <Box>
                            <MyTeamCalendarSection/>
                        </Box>
                        <Box>
                            <MyTeamTrainingSection/>
                        </Box>
                        {!dataMyProfile.myProfile.isGuest && (
                            <Box>
                                <FinishedScheduleLogsSection />
                            </Box>
                        )}
                        <Box>
                            <TeamBoardSection
                                teamName={dataMyProfile?.myProfile.teamBoard.team.name}
                                introduction={dataMyProfile?.myProfile.teamBoard?.introduction}
                                coachName={dataMyProfile?.myProfile.teamBoard?.coach}
                                joinCount={dataMyProfile?.myProfile.teamBoard.joinCount}
                                isMyTeam={true}
                            />
                        </Box>
                    </Flex>
                </Box>
            </Flex>
            <ModalSection
                isJoinTeam={dataMyProfile?.myProfile.teamBoard !== null}
                isCoach={dataMyProfile?.myProfile.isCoach!}
                page="myPage"
            />
        </>
    )
})

export default Main