import { useCallback } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"

import { userAuthModalState } from "../store/userAuthModalState"
import { teamAuthModalState } from "../store/teamAuthModalState"
import { trainingCreateOrUpdateModalState } from "../store/trainingCreateOrUpdateModalState"
import { confirmTrainingDeleteModalState } from "../store/confirmTrainingDeleteModalState"
import { scheduleCreateModalState } from "../store/scheduleCreateModalState"
import { confirmScheduleDeleteModalState } from "../store/confirmScheduleDeleteModalState"
import { scheduleDeleteModalState } from "../store/scheduleDeleteModalState"
import { myProfileEditModalState } from "../store/myProfileEditModalState"
import { confirmTeamLeaveModalState } from "../store/confirmTeamLeaveModalState"
import { confirmUserDeleteModalState } from "../store/confirmUserDeleteModalState"

export const useControllModal = () => {
    const setUserAuthModal = useSetRecoilState(userAuthModalState)
    const setTeamAuthModal = useSetRecoilState(teamAuthModalState)
    const setMyProfileEditModal = useSetRecoilState(myProfileEditModalState)
    const setConfirmUserDeleteModal = useSetRecoilState(confirmUserDeleteModalState)
    const setConfirmTeamLeaveModal = useSetRecoilState(confirmTeamLeaveModalState)
    const [trainingCreateOrUpdateModal, setTrainingCreateOrUpdateModal] = useRecoilState(trainingCreateOrUpdateModalState)
    const [confirmTrainingDeleteModal, setConfirmTrainingDeleteModal] = useRecoilState(confirmTrainingDeleteModalState)
    const setScheduleCreateModal = useSetRecoilState(scheduleCreateModalState)
    const setScheduleDeleteModal = useSetRecoilState(scheduleDeleteModalState)
    const setConfirmScheduleDeleteModal = useSetRecoilState(confirmScheduleDeleteModalState)

    const onOpenUserAuthModal = useCallback((isLogin: boolean) => setUserAuthModal({ isLogin, isOpen: true }), [])
    const onCloseUserAuthModal = useCallback(() => setUserAuthModal({ isLogin: true, isOpen: false }), [])

    const onOpenTeamAuthModal = useCallback((isJoin: boolean) => setTeamAuthModal({ isOpen: true, isJoin }), [])
    const onCloseTeamAuthModal = useCallback(() => setTeamAuthModal({ isOpen: false, isJoin: false }), [])

    const onOpenConfirmTeamLeaveModal = useCallback(
        (id: string, nickname: string, isMyself: boolean) =>  {
            setConfirmTeamLeaveModal({ id, nickname, isMyself, isOpen: true })
    }, [])
    const onCloseConfirmTeamLeaveModal = useCallback(() =>  {
            setConfirmTeamLeaveModal({ id: "", nickname: "", isMyself: true, isOpen: false })
    }, [])

    const onOpenMyProfileEditModal = useCallback(() => setMyProfileEditModal(true), [])
    const onCloseMyProfileEditModal = useCallback(() => setMyProfileEditModal(false), [])

    const onOpenConfirmUserDeleteModal = useCallback(() => setConfirmUserDeleteModal(true), [])
    const onCloseConfirmUserDeleteModal = useCallback(() => setConfirmUserDeleteModal(false), []) 

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

    const onOpenScheduleDeleteModal = useCallback(() => setScheduleDeleteModal(true), [])
    const onCloseScheduleDeleteModal = useCallback(() => setScheduleDeleteModal(false), [])

    const onOpenConfirmScheduleDeleteModal = useCallback(
        (id: string, title: string, date: string, startDate: string, endDate: string, isManySchedule: boolean) => 
            setConfirmScheduleDeleteModal({
                id,
                title,
                date,
                startDate,
                endDate,
                isManySchedule,
                isOpen: true,
            })
    , [])
    const onCloseConfirmScheduleDeleteModal = useCallback(() => 
        setConfirmScheduleDeleteModal({
            id: "",
            title: "",
            date: "",
            startDate: "",
            endDate: "",
            isManySchedule: false,
            isOpen: false,
        })
    , [])

    return {
        onOpenUserAuthModal,
        onCloseUserAuthModal,
        onOpenTeamAuthModal,
        onCloseTeamAuthModal,
        onOpenConfirmTeamLeaveModal,
        onCloseConfirmTeamLeaveModal,
        onOpenMyProfileEditModal,
        onCloseMyProfileEditModal,
        onOpenConfirmUserDeleteModal,
        onCloseConfirmUserDeleteModal,
        onOpenTrainingCreateModal,
        onOpenTrainingUpdateModal,
        onCloseTrainingCreateOrUpdateModal,
        onOpenConfirmTrainingDeleteModal,
        onCloseConfirmTrainingDeleteModal,
        onOpenScheduleCreateModal,
        onCloseScheduleCreateModal,
        onOpenScheduleDeleteModal,
        onCloseScheduleDeleteModal,
        onOpenConfirmScheduleDeleteModal,
        onCloseConfirmScheduleDeleteModal
    }
}