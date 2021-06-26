import { memo, VFC, useEffect } from "react";
import { useRouter } from "next/router";
import { Flex, Box } from "@chakra-ui/layout";

import { useMessage } from "../../hooks/useMessage";
import { useGetMyProfile } from "../../hooks/queries/useGetMyProfile";
import { CustomSpinner } from "../../components/atoms/spinner/CustomSpinner";
import { FailedText } from "../../components/atoms/text/FailedText";
import { TeamAuthModal } from "../../components/organisms/modal/TeamAuthModal";
import { HeadTitle } from '../../components/atoms/title/HeadTitle'
import { HeaderForAuthUser } from "../../components/templates/HeaderForAuthUser";
import { MainMenubar } from "../../components/templates/MainMenubar";
import { useGetAllTeamBoard } from "../../hooks/queries/useGetAllTeamBoard";
import { TeamCard } from "../../components/organisms/layout/TeamCard";
import { ModalSection } from "../../components/templates/ModalSection";

const TeamList: VFC = memo(() => {
    const router = useRouter()
    const { showMessage } = useMessage()
    const { loadingMyProfile, errorMyProfile, dataMyProfile } = useGetMyProfile()
    const { loadingAllTeamBoard, dataAllTeamBoard, errorAllTeamBoard } = useGetAllTeamBoard()

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
             <HeadTitle title='チームリスト' />
             <HeaderForAuthUser
                title='チームリスト'
                nickname={dataMyProfile?.myProfile.nickname!}
                myTeamBoard={dataMyProfile?.myProfile.teamBoard}
                isMyTeamPage={false}
                isCoach={dataMyProfile?.myProfile.isCoach!}
                isGuest={dataMyProfile?.myProfile.isGuest!}
            />
            {dataMyProfile.myProfile.nickname}
            <TeamAuthModal />
            <Flex>
                <MainMenubar
                    isJoinTeam={dataMyProfile?.myProfile.teamBoard !== null}
                    isCoach={dataMyProfile?.myProfile.isCoach!}
                    isMyTeamPage={false}
                    isGuest={dataMyProfile?.myProfile.isGuest!}
                />
                  <Box mt="150px" color="white">
                    <Flex flexWrap="wrap">
                        {loadingAllTeamBoard && <CustomSpinner />}
                        {errorAllTeamBoard && <FailedText />}
                        {dataAllTeamBoard?.allTeamBoard.edges?.map(({ node }) => (
                            <TeamCard
                                key={node.id}
                                teamId={node.team.id}
                                teamName={node.team.name}
                                coachName={node.coach}
                                introduction={node.introduction}
                                joinCount={node.joinCount}
                            />
                        ))}
                    </Flex>
                </Box>
            </Flex>
            <ModalSection
                isJoinTeam={dataMyProfile?.myProfile.teamBoard !== null}
                isCoach={dataMyProfile?.myProfile.isCoach!}
                page="teamListPage"
            />
        </>
    )
})

export default TeamList