import { atom } from 'recoil'

export type StateType = {
    id: string;
    title: string;
    date: string;
    isOpen: "section" | "modal" | false;
}

export const finishedScheduleMemberListModalState = atom<StateType>({
    key: "finishedScheduleMemberListModalState",
    default: {
        id: "",
        title: "",
        date: "",
        isOpen: false
    }
});