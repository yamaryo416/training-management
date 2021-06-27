import { memo, VFC } from "react";
import { useRouter } from 'next/router';
import { useQuery } from "@apollo/client";

import { OneTeamFromIdType } from "../../../types/queriesType";
import { GET_ONE_TEAM_FROM_ID } from "../../queries";
import { CustomSpinner } from "../../components/atoms/spinner/CustomSpinner"
import { HeadTitle } from '../../components/atoms/title/HeadTitle'

const TeamDetail: VFC = memo(() => {
    const router = useRouter()
    const { id } = router.query

    const {loading: loadingOneTeamFromId, data: dataOneTeamFromId, error: errorOneTeamFromId } = useQuery<OneTeamFromIdType>(GET_ONE_TEAM_FROM_ID, {
        variables: { teamId: id }
    })

    if (loadingOneTeamFromId) return <CustomSpinner />

    return (
        <>
            <HeadTitle title={dataOneTeamFromId?.oneTeamFromId.name} />
        </>
    )
})

export default TeamDetail