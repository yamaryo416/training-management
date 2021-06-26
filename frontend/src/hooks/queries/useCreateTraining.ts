import { useCallback } from "react"
import { useMutation } from "@apollo/client"

import { CREATE_TRAINING, GET_MY_TEAM_TRAININGS } from "../../queries"
import { useMessage } from "../useMessage"
import { useControllModal } from "../useControllModal"
import { useRecoilState } from "recoil"

export const useCreateTraining = () => {
   const { onCloseTrainingCreateOrUpdateModal } = useControllModal()

    const { showMessage } = useMessage()

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
        } catch (err) {
            showMessage({ title: err, status: "error" })
        }
    }, [])

    return { createTraining }
}