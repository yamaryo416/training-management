import { atom } from 'recoil'

type StateType = {
    title: string;
    description: string;
    finishedPatern: string;
    iconNumber: number | undefined;
    isOpen: boolean;
}

export const trainingDetailModalState = atom<StateType>({
    key: "trainingDetailModalState",
    default: {
        title: '',
        description: '',
        finishedPatern: '',
        iconNumber: undefined,
        isOpen: false
    }
});