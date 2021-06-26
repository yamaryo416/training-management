import { atom } from 'recoil'

type StateType = {
    id: string;
    nickname: string;
    isMyself: boolean;
    isOpen: boolean;
}

export const confirmTeamLeaveModalState = atom<StateType>({
    key: "confirmTeamLeaveModalState",
    default: {
        id: "",
        nickname: "",
        isMyself: false,
        isOpen: false,
    }
});