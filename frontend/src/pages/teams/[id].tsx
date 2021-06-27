import { memo, VFC } from "react";
import { useRouter } from 'next/router';

const TeamDetail: VFC = memo(() => {
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            TeamDetail
        </>
    )
})

export default TeamDetail