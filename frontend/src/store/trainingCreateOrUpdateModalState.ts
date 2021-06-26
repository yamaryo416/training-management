import { atom } from 'recoil'

type StateType = {
    id: string;
    title: string;
    description: string;
    iconNumber: number | undefined;
    finishedPatern: string;
    isOpen: boolean;
    isCreate: boolean;
}

export const trainingCreateOrUpdateModalState = atom<StateType>({
    key: "trainingCreateOrUpdateModalState",
    default: {
        id: '',
        title: '',
        description: '',
        iconNumber: undefined,
        finishedPatern: '',
        isOpen: false,
        isCreate: false,
    }
});