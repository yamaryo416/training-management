import { useCallback } from "react"
import { useMutation } from "@apollo/client"

import { CREATE_TRAINING, GET_MY_TEAM_TRAININGS } from "../../queries"
import { useMessage } from "../useMessage"
import { useControllModal } from "../useControllModal"
import { useRecoilState } from "recoil"
import { tutorialState } from "../../store/tutorialState"

export const useCreateTraining = () => {
   const { onCloseTrainingCreateOrUpdateModal } = useControllModal()

    const { showMessage } = useMessage()

    const [tutorial, setTutorial] = useRecoilState(tutorialState)

    const [createTrainingMutation] = useMutation(CREATE_TRAINING, {
        refetchQueries: [{ query: GET_MY_TEAM_TRAININGS }],
    })

    const createTraining = useCallback(async (
        title: string,
        description: string,
        iconNumber: number | undefined,
        finishedPatern: string
        ) => {
        try {
            if (title === "") {
                throw "トレーニング名を入力してください。"
            }
            await createTrainingMutation({
                variables: { title, description, iconNumber, finishedPatern }
            })
            showMessage({ title: "トレーニングを作成しました。", status: "success" })
            onCloseTrainingCreateOrUpdateModal()
            if (tutorial === 3) {
                setTutorial(4)
            }
        } catch (err) {
            showMessage({ title: err, status: "error" })
        }
    }, [])

    return { createTraining }
}