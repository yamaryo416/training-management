import { memo, VFC, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Flex } from "@chakra-ui/layout";

import { useGetMyProfile } from "../hooks/queries/useGetMyProfile";
import { useMessage } from "../hooks/useMessage";
import { CustomSpinner } from "../components/atoms/spinner/CustomSpinner";
import { FailedText } from "../components/atoms/text/FailedText";
import { HeadTitle } from '../components/atoms/title/HeadTitle'
import { HeaderForAuthUser } from "../components/templates/HeaderForAuthUser";
import { MainMenubar } from "../components/templates/MainMenubar";

const MyTeamMember: VFC = memo(() => {
    const router = useRouter()
    const { showMessage } = useMessage()
    const { loadingMyProfile, dataMyProfile, errorMyProfile } = useGetMyProfile()

    useEffect(() => {
        if (errorMyProfile) {
            localStorage.removeItem('token')
        }
        if (!localStorage.getItem('token')) {
            router.push('/')
            showMessage({ title: 'ログインしてください。', status: 'error'})
        }
        if (!dataMyProfile.myProfile.isCoach) {
            router.push('/main')
            showMessage({ title: '権限がありません。', status: 'error'})
        }
    }, [dataMyProfile])

    if (loadingMyProfile) return <CustomSpinner />
    else if (errorMyProfile) return <FailedText />

    return (
        <>
            <HeadTitle title='マイチームメンバー' />
            <HeaderForAuthUser
                title='マイチームメンバー'
                nickname={dataMyProfile?.myProfile.nickname!}
                myTeamBoard={dataMyProfile?.myProfile.teamBoard}
                isMyTeamPage={true}
                isCoach={true}
                isGuest={false}
            />
            <Flex>
                <MainMenubar isJoinTeam={true} isCoach={true} isMyTeamPage={true} isGuest={false} />
            </Flex>
        </>
    )
})

export default MyTeamMember