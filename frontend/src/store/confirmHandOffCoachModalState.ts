import { atom } from 'recoil'

type StateType = {
    id: string;
    nickname: string;
    isOpen: boolean;
}

export const confirmHandOffCoachModalState = atom<StateType>({
    key: "confirmHandOffCoachModalState",
    default: {
        id: "",
        nickname: "",
        isOpen: false,
    }
});