import { useCallback } from "react"
import { useMutation } from "@apollo/client"
import { useRecoilValue } from "recoil"

import { DELETE_FINISHED_SCHEDULE, GET_MY_FINISHED_SCHEDULES, GET_MY_TEAM_FINISHED_SCHEDULES, GET_MY_TEAM_TRAININGS, GET_ONE_DAY_SCHEDULES } from "../../queries"
import { scheduleOneDayState } from "../../store/scheduleOneDayState"
import { useMessage } from "../useMessage"
import { useControllModal } from "../useControllModal"

export const useDeleteFinishedSchedule = () => {
    const oneDay = useRecoilValue(scheduleOneDayState)

    const { onCloseConfirmFinishedScheduleDeleteModal } = useControllModal()

    const { showMessage } = useMessage()

    const [deleteFinishedScheduleMutation] = useMutation(DELETE_FINISHED_SCHEDULE, {
        refetchQueries: [
            { query: GET_MY_TEAM_FINISHED_SCHEDULES},
            { query: GET_MY_FINISHED_SCHEDULES },
            { query: GET_MY_TEAM_TRAININGS},
            { query: GET_ONE_DAY_SCHEDULES, variables: { date: oneDay} }
        ]})

    const deleteFinishedSchedule = useCallback(
        async (scheduleId: string) => {
            await deleteFinishedScheduleMutation({ variables: { scheduleId } })
            onCloseConfirmFinishedScheduleDeleteModal()
            showMessage({ title: '実施を取り消しました。', status: 'success' })
         } , [])
    
    return { deleteFinishedSchedule }
}