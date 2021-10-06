import { useQuery } from "@apollo/client"

import { GET_MY_FINISHED_SCHEDULES } from "../../queries"
import { MyFinishedSchedulesType } from "../../../types/queriesType"

export const useGetMyFinishedSchedules = () => {
    const {
        loading: loadingMyFinishedSchedules,
        data: dataMyFinishedSchedules,
        error: errorMyFinishedSchedules,
    } = useQuery<MyFinishedSchedulesType>(GET_MY_FINISHED_SCHEDULES, {
        fetchPolicy: "cache-and-network"
    })

    return { loadingMyFinishedSchedules, dataMyFinishedSchedules, errorMyFinishedSchedules }
}