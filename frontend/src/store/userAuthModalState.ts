import { atom } from 'recoil'

export const userAuthModalState = atom({
    key: "userAuthModalState",
    default: {
        isLogin: false,
        isOpen: false
    }
});