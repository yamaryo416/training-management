export const mockTrainingWithIcon = (id: string, finishedPatern: string) => {
    return {
        id,
        title: `トレーニング${id}`,
        description: '',
        iconNumber: Number(id),
        finishedPatern,
        finishedSchedules: {
            edges: []
        }
    }
}

export const mockTrainingWithoutIcon =  (id: string)  => {
    return {
        id,
        title: `アイコンなしトレーニング${id}`,
        description: '',
        iconNumber: 0,
        finishedPatern: '1',
        finishedSchedules: {
            edges: []
        }
    }
}