import { useCallback } from "react"
import { useSetRecoilState } from "recoil"

import { userAuthModalState } from "../store/userAuthModalState"

export const useControllModal = () => {
    const setUserAuthModal = useSetRecoilState(userAuthModalState)

    const onOpenUserAuthModal = useCallback((isLogin: boolean) => setUserAuthModal({ isLogin, isOpen: true }), [])
    const onCloseUserAuthModal = useCallback(() => setUserAuthModal({ isLogin: true, isOpen: false }), [])

    reutnr {
        onOpenUserAuthModal,
        onCloseUserAuthModal
    }
}