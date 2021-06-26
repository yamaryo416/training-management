import { useCallback } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"

import { userAuthModalState } from "../store/userAuthModalState"
import { teamAuthModalState } from "../store/teamAuthModalState"
import { trainingCreateOrUpdateModalState } from "../store/trainingCreateOrUpdateModalState"
import { confirmTrainingDeleteModalState } from "../store/confirmTrainingDeleteModalState"
import { scheduleCreateModalState } from "../store/scheduleCreateModalState"

export const useControllModal = () => {
    const setUserAuthModal = useSetRecoilState(userAuthModalState)
    const setTeamAuthModal = useSetRecoilState(teamAuthModalState)
    const [trainingCreateOrUpdateModal, setTrainingCreateOrUpdateModal] = useRecoilState(trainingCreateOrUpdateModalState)
    const [confirmTrainingDeleteModal, setConfirmTrainingDeleteModal] = useRecoilState(confirmTrainingDeleteModalState)
    const setScheduleCreateModal = useSetRecoilState(scheduleCreateModalState)

    const onOpenUserAuthModal = useCallback((isLogin: boolean) => setUserAuthModal({ isLogin, isOpen: true }), [])
    const onCloseUserAuthModal = useCallback(() => setUserAuthModal({ isLogin: true, isOpen: false }), [])

    const onOpenTeamAuthModal = useCallback((isJoin: boolean) => setTeamAuthModal({ isOpen: true, isJoin }), [])
    const onCloseTeamAuthModal = useCallback(() => setTeamAuthModal({ isOpen: false, isJoin: false }), [])

    const onOpenTrainingCreateModal = useCallback(
        () => setTrainingCreateOrUpdateModal({...trainingCreateOrUpdateModal, isOpen: true, isCreate: true }), 
    [])
    const onOpenTrainingUpdateModal = useCallback(
        (
            id: string,
            title: string,
            description: string,
            iconNumber: number | undefined,
            finishedPatern: string
        ) => 
            setTrainingCreateOrUpdateModal({ id, title, description, iconNumber, finishedPatern, isOpen: true, isCreate: false })
    , [])
    const onCloseTrainingCreateOrUpdateModal = useCallback(
        () => setTrainingCreateOrUpdateModal({ 
            id: '',
            title: '',
            description: '',
            iconNumber: undefined,
            finishedPatern: '',
            isOpen: false,
            isCreate: false,
            }) 
    , [])

    const onOpenConfirmTrainingDeleteModal = useCallback(
        (
            id: string,
            title: string,
            description: string
        ) => {
            setConfirmTrainingDeleteModal({
                id,
                title,
                description,
                isOpen: true
            })
    }, [])
    const onCloseConfirmTrainingDeleteModal = useCallback(
        () => {
            setConfirmTrainingDeleteModal({
                id: '',
                title: '',
                description: '',
                isOpen: false
            })
    }, [])

    const onOpenScheduleCreateModal = useCallback(() => setScheduleCreateModal(true), [])
    const onCloseScheduleCreateModal = useCallback(() => setScheduleCreateModal(false), [])

    return {
        onOpenUserAuthModal,
        onCloseUserAuthModal,
        onOpenTeamAuthModal,
        onCloseTeamAuthModal,
        onOpenTrainingCreateModal,
        onOpenTrainingUpdateModal,
        onCloseTrainingCreateOrUpdateModal,
        onOpenConfirmTrainingDeleteModal,
        onCloseConfirmTrainingDeleteModal,
        onOpenScheduleCreateModal,
        onCloseScheduleCreateModal
    }
}