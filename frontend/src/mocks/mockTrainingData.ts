import { GET_MY_TEAM_TRAININGS } from "../queries"

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

export const mockTrainingWithFinishedSchedules = (id: string, finishedPatern: string) => {
    return {
        id,
        title: `トレーニング${id}`,
        description: '',
        iconNumber: Number(id),
        finishedPatern,
        finishedSchedules: {
            edges: [
                {
                    node: {
                        profile: {
                            id: '1'
                        }
                    }
                }
            ]
        }
    }
}

export const mockTrainings = {
    edges: [
        { node: mockTrainingWithIcon('1', '1')  },
        { node: mockTrainingWithFinishedSchedules('2', '1') },
        { node: mockTrainingWithIcon('3', '1') },
        { node: mockTrainingWithIcon('4', '1') },
        { node: mockTrainingWithIcon('5', '1') },
        { node: mockTrainingWithIcon('6', '1') },
        { node: mockTrainingWithIcon('7', '1') },
        { node: mockTrainingWithIcon('8', '1') },
        { node: mockTrainingWithIcon('9', '1') },
        { node: mockTrainingWithIcon('10', '1') },
        { node: mockTrainingWithIcon('11', '1') },
    ]
}

export const mockMyTeamTrainingsQuery = {
    request: {
        query: GET_MY_TEAM_TRAININGS,
    },
    result: {
        data: {
            myTeamTrainings: mockTrainings
        }
    }
}