import { useCallback } from "react"
import { useSetRecoilState } from "recoil"

import { userAuthModalState } from "../store/userAuthModalState"
import { teamAuthModalState } from "../store/teamAuthModalState"

export const useControllModal = () => {
    const setUserAuthModal = useSetRecoilState(userAuthModalState)
    const setTeamAuthModal = useSetRecoilState(teamAuthModalState)

    const onOpenUserAuthModal = useCallback((isLogin: boolean) => setUserAuthModal({ isLogin, isOpen: true }), [])
    const onCloseUserAuthModal = useCallback(() => setUserAuthModal({ isLogin: true, isOpen: false }), [])

    const onOpenTeamAuthModal = useCallback((isJoin: boolean) => setTeamAuthModal({ isOpen: true, isJoin }), [])
    const onCloseTeamAuthModal = useCallback(() => setTeamAuthModal({ isOpen: false, isJoin: false }), [])

    return {
        onOpenUserAuthModal,
        onCloseUserAuthModal,
        onOpenTeamAuthModal,
        onCloseTeamAuthModal,
    }
}