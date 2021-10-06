import { atom } from 'recoil'

type StateType = {
    trainingId: string;
    title: string;
    finishedPatern: string;
    isOpen: boolean;
}

export const trainingImplementationState = atom<StateType>({
    key: "trainingImplementationState",
    default: {
        trainingId: '',
        title: '',
        finishedPatern: '',
        isOpen: false,
    }
});