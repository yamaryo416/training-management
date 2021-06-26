import { atom } from 'recoil'

type StateType = {
    id: string;
    title: string;
    date: string;
    startDate: string;
    endDate: string;
    isOpen: boolean;
    isManySchedule: boolean;
}

export const confirmScheduleDeleteModalState = atom<StateType>({
    key: "confirmScheduleDeleteModalState",
    default: {
        id: "",
        title: "",
        date: "",
        startDate: "",
        endDate: "",
        isOpen: false,
        isManySchedule: false,
    }
});