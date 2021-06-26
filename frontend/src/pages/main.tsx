import { memo, VFC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/layout'

import { useGetMyProfile } from '../hooks/queries/useGetMyProfile'
import { useMessage } from '../hooks/useMessage'
import { CustomSpinner } from '../components/atoms/spinner/CustomSpinner'
import { FailedText } from "../components/atoms/text/FailedText";
import { HeadTitle } from '../components/atoms/title/HeadTitle'
import { HeaderForAuthUser } from '../components/templates/HeaderForAuthUser'
import { MainMenubar } from '../components/templates/MainMenubar'
import { ModalSection } from '../components/templates/ModalSection'

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
            {dataMyProfile.myProfile.nickname}
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