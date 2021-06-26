import { atom } from 'recoil'

export type StateType = {
    id: string;
    title: string;
    date: string;
    finishedPatern: string;
    isOpen: boolean;
}

export const finishedScheduleCreateModalState = atom<StateType>({
    key: "finishedScheduleCreateModalState",
    default: {
        id: "",
        title: "",
        date: "",
        finishedPatern: "",
        isOpen: false
    }
});