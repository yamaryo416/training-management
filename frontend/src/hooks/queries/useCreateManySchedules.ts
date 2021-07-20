import { useMutation } from "@apollo/client"
import moment from "moment"
import { useRecoilState, useRecoilValue } from "recoil"

import { CREATE_MANY_SCHEDULES, GET_MY_TEAM_WEEK_SCHEDULES } from "../../queries"
import { calendarDateState } from "../../store/calendarDateState"
import { tutorialState } from "../../store/tutorialState"
import { useControllModal } from "../useControllModal"
import { useMessage } from "../useMessage"

export const useCreateManySchedules = () => {
    const calendarDate = useRecoilValue(calendarDateState)

    const { showMessage } = useMessage()
    const { onCloseScheduleCreateModal } = useControllModal()

    const [tutorial, setTutorial] = useRecoilState(tutorialState)

    const [createManySchedulesMutation] = useMutation(CREATE_MANY_SCHEDULES, {
        refetchQueries: [{ query: GET_MY_TEAM_WEEK_SCHEDULES, variables: { startDate: calendarDate.firstDate.format('YYYY-MM-DD') } }]
    })

    const createManySchedules = async (trainingId: string, startDate: string, endDate: string, dayOfWeek: string) => {
        if (dayOfWeek === '') {
            showMessage({ title: "曜日を選択してください。", status: "error" })
        } else if (moment(startDate) > moment(endDate)) {
            showMessage({ title: "期間を正しく入力してください。", status: "error" })
        } else {
            await createManySchedulesMutation({
                variables: { trainingId, startDate, endDate, dayOfWeek }
            })
            showMessage({ title: "スケジュールを作成しました。", status: "success" })
            onCloseScheduleCreateModal()
            if (tutorial === 4) {
                setTutorial(0)
            }
        }
    }

    return { createManySchedules }
}