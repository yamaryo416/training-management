import { useCallback } from "react"
import { useMutation } from "@apollo/client"
import { useRecoilState, useRecoilValue } from "recoil"

import { CREATE_FINISHED_SCHEDULE, GET_MY_FINISHED_SCHEDULES, GET_MY_TEAM_FINISHED_SCHEDULES, GET_MY_TEAM_TRAININGS, GET_ONE_DAY_SCHEDULES } from "../../queries"
import { scheduleOneDayState } from "../../store/scheduleOneDayState"
import { useControllModal } from "../useControllModal"
import { useMessage } from "../useMessage"
import { tutorialState } from "../../store/tutorialState"

export const useCreateFinishedSchedule = () => {
    const oneDay = useRecoilValue(scheduleOneDayState)

    const { onCloseFinishedScheduleCreateModal } = useControllModal()
    const { showMessage } = useMessage()

    const [tutorial, setTutorial] = useRecoilState(tutorialState)
    
    const [createFinishedScheduleMutation] = useMutation(CREATE_FINISHED_SCHEDULE, {
        refetchQueries: [
            { query: GET_MY_TEAM_FINISHED_SCHEDULES },
            { query: GET_MY_FINISHED_SCHEDULES },
            { query: GET_MY_TEAM_TRAININGS},
            { query: GET_ONE_DAY_SCHEDULES, variables: { date: oneDay}
    }]})

    const createFinishedSchedule = useCallback(
        async (scheduleId: string, count: number, load: number, distance: number, minitus: number, comment: string) => {
            try {
                await createFinishedScheduleMutation({ 
                    variables: { 
                        scheduleId,
                        count,
                        load,
                        distance,
                        minitus,
                        comment
                    } 
                })
                onCloseFinishedScheduleCreateModal()
                showMessage({ title: 'スケジュールを実施しました。', status: 'success' })
                if (tutorial === 3) {
                    setTutorial(0)
                }
            } catch (err) {
                if (err.message.includes('Count')) {
                    showMessage({ title: '回数を入力してください。', status: 'error' })
                } else if (err.message.includes('Load')) {
                    showMessage({ title: '負荷を入力してください', status: 'error' })
                } else if (err.message.includes('Distance')) {
                    showMessage({ title: '距離を入力してください。', status: 'error' })
                } else if (err.message.includes('Minitus')) {
                    showMessage({ title: '時間を入力してください。', status: 'error' })
                }
            }
    }, [])

    return { createFinishedSchedule }
}