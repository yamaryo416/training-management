import { useCallback } from "react"
import { useMutation } from "@apollo/client"

import { DELETE_MANY_SCHEDULES, GET_MY_TEAM_WEEK_SCHEDULES } from "../../queries"
import { useControllModal } from "../useControllModal"
import { useMessage } from "../useMessage"
import { useRecoilValue } from "recoil"
import { calendarDateState } from "../../store/calendarDateState"

export const useDeleteManySchedules = () => {
    const calendarDate = useRecoilValue(calendarDateState)

    const [deleteManySchedulesMutation] = useMutation(DELETE_MANY_SCHEDULES, {
        refetchQueries: [{ query: GET_MY_TEAM_WEEK_SCHEDULES, variables: { startDate: calendarDate.firstDate.format('YYYY-MM-DD') } }]
    })

    const { showMessage } = useMessage()
    const { onCloseScheduleDeleteModal } = useControllModal()

    const deleteManySchedules = useCallback(
        async (startDate: string, endDate: string, trainingId: string) => {
            if (trainingId === "") {
                await deleteManySchedulesMutation({
                    variables: { startDate, endDate }
                })
            } else {
                await deleteManySchedulesMutation({
                    variables: { startDate, endDate, trainingId }
                })
            }
            showMessage({ title: "スケジュールを削除しました。", status: "success" })
            onCloseScheduleDeleteModal()
        }, [])

    return { deleteManySchedules }
}