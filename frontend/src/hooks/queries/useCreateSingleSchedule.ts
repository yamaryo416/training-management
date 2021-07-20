import { useCallback } from "react"
import { useMutation } from "@apollo/client"

import { CREATE_SINGLE_SCHEDULE, GET_MY_TEAM_WEEK_SCHEDULES } from "../../queries"
import { useControllModal } from "../useControllModal"
import { useMessage } from "../useMessage"
import { useRecoilState, useRecoilValue } from "recoil"
import { tutorialState } from "../../store/tutorialState"
import { calendarDateState } from "../../store/calendarDateState"

export const useCreateSingleSchedule = () => {
    const calendarDate = useRecoilValue(calendarDateState)

    const { showMessage } = useMessage()
    const { onCloseScheduleCreateModal } = useControllModal()

    const [tutorial, setTutorial] = useRecoilState(tutorialState)

    const [createSingleScheduleMutation] = useMutation(CREATE_SINGLE_SCHEDULE, {
        refetchQueries: [{ query: GET_MY_TEAM_WEEK_SCHEDULES, variables: { startDate: calendarDate.firstDate.format('YYYY-MM-DD') } }]
    })

    const createSingleSchedule = useCallback(async (trainingId: string, date: string) => {
        try {
            await createSingleScheduleMutation({
                variables: { trainingId, date }
            })
            showMessage({ title: "スケジュールを作成しました。", status: "success" })
            onCloseScheduleCreateModal()
            if (tutorial === 4) {
                setTutorial(0)
            }
        } catch (err) {
            alert(err)
        }
    }, [])

    return { createSingleSchedule }
}