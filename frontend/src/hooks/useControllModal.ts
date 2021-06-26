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
import { teamEditModalState } from "../store/teamEditModalState"
import { confirmPostDeleteModalState } from "../store/confirmPostDeleteModalState"
import { trainingDetailModalState } from "../store/trainingDetailModalState"
import { finishedScheduleCreateModalState } from "../store/finishedScheduleCreateModalState"
import { confirmFinishedScheduleDeleteModalState } from "../store/confirmFinishedScheduleDeleteModalState"

export const useControllModal = () => {
    const setUserAuthModal = useSetRecoilState(userAuthModalState)
    const setTeamAuthModal = useSetRecoilState(teamAuthModalState)
    const setMyProfileEditModal = useSetRecoilState(myProfileEditModalState)
    const setConfirmUserDeleteModal = useSetRecoilState(confirmUserDeleteModalState)
    const setConfirmTeamLeaveModal = useSetRecoilState(confirmTeamLeaveModalState)
    const setTeamEditModal = useSetRecoilState(teamEditModalState)
    const [trainingCreateOrUpdateModal, setTrainingCreateOrUpdateModal] = useRecoilState(trainingCreateOrUpdateModalState)
    const [confirmTrainingDeleteModal, setConfirmTrainingDeleteModal] = useRecoilState(confirmTrainingDeleteModalState)
    const setTrainingDetailModal = useSetRecoilState(trainingDetailModalState)
    const setScheduleCreateModal = useSetRecoilState(scheduleCreateModalState)
    const setScheduleDeleteModal = useSetRecoilState(scheduleDeleteModalState)
    const setConfirmScheduleDeleteModal = useSetRecoilState(confirmScheduleDeleteModalState)
    const setConfirmPostDeleteModal = useSetRecoilState(confirmPostDeleteModalState)
    const setFinishedScheduleCreateModal = useSetRecoilState(finishedScheduleCreateModalState)
    const setConfirmFinishedScheduleDeleteModal = useSetRecoilState(confirmFinishedScheduleDeleteModalState)

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

    const onOpenTeamEditModal = useCallback(() => setTeamEditModal(true), [])
    const onCloseTeamEditModal = useCallback(() => setTeamEditModal(false), [])

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
    
    const onOpneTrainingDetailModal = useCallback(
        (
            title: string,
            description: string,
            finishedPatern: string,
            iconNumber: number | undefined
        ) => {
             setTrainingDetailModal({
                 title,
                 description,
                 finishedPatern,
                 iconNumber,
                 isOpen: true
            })
    }, [])
    const onCloseTrainingDetailModal = useCallback(
        () => {
            setTrainingDetailModal({
                title: '',
                description: undefined,
                finishedPatern: '',
                iconNumber: undefined,
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

    const onOpenConfirmPostDeleteModal = useCallback(
        (id: string, text: string) => {
            setConfirmPostDeleteModal({
                id, text, isOpen: true
            })
    }, [])
    const onCloseConfirmPostDeleteModal = useCallback(() => {
        setConfirmPostDeleteModal({
            id: "",
            text: "",
            isOpen: false
        })
    }, [])

    const onOpenFinishedScheduleCreateModal = useCallback(
        (id: string, title: string, date: string, finishedPatern: string) =>
            setFinishedScheduleCreateModal({
                id,
                title,
                date,
                finishedPatern,
                isOpen: true
            })
    , [])
    const onCloseFinishedScheduleCreateModal = useCallback(
        () =>
            setFinishedScheduleCreateModal({
                id: "",
                title: "",
                date: "",
                finishedPatern: "",
                isOpen: false
            })
    , [])

    const onOpenConfirmFinishedScheduleDeleteModal = useCallback(
        (id: string, title: string, date: string) =>
            setConfirmFinishedScheduleDeleteModal({
                id,
                title,
                date,
                isOpen: true
            })
    , [])
    const onCloseConfirmFinishedScheduleDeleteModal = useCallback(
        () =>
            setConfirmFinishedScheduleDeleteModal({
                id: '',
                title: '',
                date: '',
                isOpen: false
            })
    , [])

    return {
        onOpenUserAuthModal,
        onCloseUserAuthModal,
        onOpenTeamAuthModal,
        onCloseTeamAuthModal,
        onOpenConfirmTeamLeaveModal,
        onCloseConfirmTeamLeaveModal,
        onOpenTeamEditModal,
        onCloseTeamEditModal,
        onOpenMyProfileEditModal,
        onCloseMyProfileEditModal,
        onOpenConfirmUserDeleteModal,
        onCloseConfirmUserDeleteModal,
        onOpenTrainingCreateModal,
        onOpenTrainingUpdateModal,
        onCloseTrainingCreateOrUpdateModal,
        onOpenConfirmTrainingDeleteModal,
        onCloseConfirmTrainingDeleteModal,
        onOpneTrainingDetailModal,
        onCloseTrainingDetailModal,
        onOpenScheduleCreateModal,
        onCloseScheduleCreateModal,
        onOpenScheduleDeleteModal,
        onCloseScheduleDeleteModal,
        onOpenConfirmScheduleDeleteModal,
        onCloseConfirmScheduleDeleteModal,
        onOpenConfirmPostDeleteModal,
        onCloseConfirmPostDeleteModal,
        onOpenFinishedScheduleCreateModal,
        onCloseFinishedScheduleCreateModal,
        onOpenConfirmFinishedScheduleDeleteModal,
        onCloseConfirmFinishedScheduleDeleteModal
    }
}