import { useRouter } from "next/router";
import { memo, VFC, useEffect } from "react";

import { useMessage } from "../../hooks/useMessage";
import { useGetMyProfile } from "../../hooks/queries/useGetMyProfile";
import { CustomSpinner } from "../../components/atoms/spinner/CustomSpinner";
import { FailedText } from "../../components/atoms/text/FailedText";
import { TeamAuthModal } from "../../components/organisms/modal/TeamAuthModal";

const TeamList: VFC = memo(() => {
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
            {dataMyProfile.myProfile.nickname}
            <TeamAuthModal />
        </>
    )
})

export default TeamList