import { atom } from 'recoil'

type StateType = {
    id: string;
    title: string;
    date: string;
    isOpen: boolean;
}

export const confirmFinishedScheduleDeleteModalState = atom<StateType>({
    key: "confirmFinishedScheduleDeleteModalState",
    default: {
        id: "",
        title: "",
        date: '',
        isOpen: false,
    }
});