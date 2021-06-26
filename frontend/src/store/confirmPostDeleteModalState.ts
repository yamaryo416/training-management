import { atom } from 'recoil'

type StateType = {
    id: string;
    text: string;
    isOpen: boolean;
}

export const confirmPostDeleteModalState = atom<StateType>({
    key: "confirmPostDeleteModalState",
    default: {
        id: "",
        text: "",
        isOpen: false,
    }
});