import { memo, VFC, useEffect } from "react";
import { useRouter } from "next/router";

import { useGetMyProfile } from "../hooks/queries/useGetMyProfile";
import { useMessage } from "../hooks/useMessage";
import { CustomSpinner } from "../components/atoms/spinner/CustomSpinner";
import { HeadTitle } from '../components/atoms/title/HeadTitle'

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

    return (
        <>
            <HeadTitle title='マイチームメンバー' />
        </>
    )
})

export default MyTeamMember