import { useCallback } from "react"
import { useMutation } from "@apollo/client"

import { CREATE_SINGLE_SCHEDULE, GET_MY_TEAM_SCHEDULES } from "../../queries"
import { useControllModal } from "../useControllModal"
import { useMessage } from "../useMessage"
import { useRecoilState } from "recoil"
import { tutorialState } from "../../store/tutorialState"

export const useCreateSingleSchedule = () => {
    const { showMessage } = useMessage()
    const { onCloseScheduleCreateModal } = useControllModal()

    const [tutorial, setTutorial] = useRecoilState(tutorialState)
    
    const [createSingleScheduleMutation] = useMutation(CREATE_SINGLE_SCHEDULE,{
        refetchQueries: [{ query: GET_MY_TEAM_SCHEDULES }]
    })

    const createSingleSchedule =  useCallback(async (trainingId: string, date: string) => {
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