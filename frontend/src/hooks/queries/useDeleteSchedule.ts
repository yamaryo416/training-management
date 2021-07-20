import { useCallback } from "react"
import { useMutation } from "@apollo/client"

import { DELETE_SCHEDULE, GET_MY_TEAM_WEEK_SCHEDULES } from "../../queries"
import { useControllModal } from "../useControllModal"
import { useMessage } from "../useMessage"
import { useRecoilValue } from "recoil"
import { calendarDateState } from "../../store/calendarDateState"

export const useDeleteSchedule = () => {
    const calendarDate = useRecoilValue(calendarDateState)

    const [deleteScheduleMutation] = useMutation(DELETE_SCHEDULE, {
        refetchQueries: [{ query: GET_MY_TEAM_WEEK_SCHEDULES, variables: { startDate: calendarDate.firstDate.format('YYYY-MM-DD') } }]
    })

    const { onCloseConfirmScheduleDeleteModal } = useControllModal()

    const { showMessage } = useMessage()

    const deleteSchedule = useCallback(
        async (scheduleId: string) => {
            await deleteScheduleMutation({
                variables: { scheduleId }
            })
            showMessage({ title: "スケジュールを削除しました。", status: "success" })
            onCloseConfirmScheduleDeleteModal()
        }, []
    )

    return { deleteSchedule }
}