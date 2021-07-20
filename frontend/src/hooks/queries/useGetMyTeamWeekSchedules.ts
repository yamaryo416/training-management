import { useQuery } from "@apollo/client"

import { GET_MY_TEAM_WEEK_SCHEDULES } from "../../queries"
import { MyTeamWeekSchedulesType } from "../../../types/queriesType"
import { useRecoilValue } from "recoil"
import { calendarDateState } from "../../store/calendarDateState"

export const useGetMyTeamWeekSchedules = () => {
    const calendarDate = useRecoilValue(calendarDateState)

    const {
        loading: loadingMyTeamWeekSchedules,
        data: dataMyTeamWeekSchedules,
        error: errorMyTeamWeekSchedules,
    } = useQuery<MyTeamWeekSchedulesType>(GET_MY_TEAM_WEEK_SCHEDULES, {
        fetchPolicy: "cache-and-network",
        variables: { startDate: calendarDate.firstDate.format('YYYY-MM-DD') },
    })

    return {
        loadingMyTeamWeekSchedules,
        dataMyTeamWeekSchedules,
        errorMyTeamWeekSchedules,
    }
}