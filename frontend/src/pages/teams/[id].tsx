import { memo, VFC, useEffect } from "react";
import { useRouter } from 'next/router';
import { useQuery } from "@apollo/client";

import { OneTeamFromIdType } from "../../../types/queriesType";
import { GET_ONE_TEAM_FROM_ID } from "../../queries";
import { CustomSpinner } from "../../components/atoms/spinner/CustomSpinner"
import { HeadTitle } from '../../components/atoms/title/HeadTitle'
import { useGetMyProfile } from "../../hooks/queries/useGetMyProfile";
import { useMessage } from "../../hooks/useMessage";
import { FailedText } from "../../components/atoms/text/FailedText";

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
        </>
    )
})

export default TeamDetail