import { atom } from 'recoil'

type StateType = {
    id: string;
    nickname: string;
    isCoach: boolean;
    isOpen: boolean;
}

export const oneMemberSelectedModalState = atom<StateType>({
    key: "oneMemberSelectedModalState",
    default: {
        id: "",
        nickname: "",
        isCoach: true,
        isOpen: false
    }
});