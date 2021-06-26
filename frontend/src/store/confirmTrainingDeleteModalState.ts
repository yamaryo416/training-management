import { atom } from 'recoil'

type StateType = {
    id: string;
    title: string;
    description: string;
    isOpen: boolean;
}

export const confirmTrainingDeleteModalState = atom<StateType>({
    key: "confirmTrainingDeleteModalState",
    default: {
        id: '',
        title: '',
        description: '',
        isOpen: false
    },
});