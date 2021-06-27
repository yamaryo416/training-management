import { memo, VFC, useEffect } from "react";
import { useRouter } from 'next/router';
import { useQuery } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/layout";

import { OneTeamFromIdType } from "../../../types/queriesType";
import { GET_ONE_TEAM_FROM_ID } from "../../queries";
import { CustomSpinner } from "../../components/atoms/spinner/CustomSpinner"
import { HeadTitle } from '../../components/atoms/title/HeadTitle'
import { useGetMyProfile } from "../../hooks/queries/useGetMyProfile";
import { useMessage } from "../../hooks/useMessage";
import { FailedText } from "../../components/atoms/text/FailedText";
import { HeaderForAuthUser } from "../../components/templates/HeaderForAuthUser";
import { MainMenubar } from "../../components/templates/MainMenubar";
import { TeamDetailMenubar } from "../../components/organisms/team/TeamDetailMenubar";
import { ConfirmTeamJoinModal } from "../../components/organisms/modal/ConfirmTeamJoinModal";

const TeamDetail: VFC = memo(() => {
    const router = useRouter()
    const { id } = router.query

    const { showMessage } = useMessage()

    const { errorMyProfile ,loadingMyProfile, dataMyProfile } = useGetMyProfile()
    const {loading: loadingOneTeamFromId, data: dataOneTeamFromId, error: errorOneTeamFromId } = useQuery<OneTeamFromIdType>(GET_ONE_TEAM_FROM_ID, {
        variables: { teamId: id }
    })

    useEffect(() => {
        if (errorMyProfile) {
            localStorage.removeItem('token')
        }
        if (!localStorage.getItem('token')) {
            router.push('/')
            showMessage({ title: 'ログインしてください。', status: 'error'})
        }
        if (errorOneTeamFromId) {
            router.push('/teams')
        }
    }, [])
    

    if (loadingMyProfile || loadingOneTeamFromId) return <CustomSpinner />
    else if (errorMyProfile || errorOneTeamFromId) return <FailedText />

    return (
        <>
            <HeadTitle title={dataOneTeamFromId?.oneTeamFromId.name} />
            <HeaderForAuthUser
                title={`${dataOneTeamFromId?.oneTeamFromId.name} ページ`}
                nickname={dataMyProfile?.myProfile.nickname!}
                myTeamBoard={dataMyProfile?.myProfile.teamBoard}
                isMyTeamPage={false}
                isCoach={dataMyProfile?.myProfile.isCoach!}
                isGuest={dataMyProfile?.myProfile.isGuest!}
            />
            <Flex>
                <MainMenubar
                    isJoinTeam={dataMyProfile?.myProfile.teamBoard !== null}
                    isCoach={dataMyProfile?.myProfile.isCoach!}
                    isMyTeamPage={false}
                    isGuest={dataMyProfile?.myProfile.isGuest!}
                />
                <Box mt='150px'>
                    <TeamDetailMenubar/>
                </Box>
            </Flex>
            <ConfirmTeamJoinModal teamName={dataOneTeamFromId?.oneTeamFromId.name} teamId={dataOneTeamFromId?.oneTeamFromId.teamBoard.id}/> 
        </>
    )
})

export default TeamDetail