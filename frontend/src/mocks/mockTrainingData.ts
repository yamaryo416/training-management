import { graphql } from 'msw'

import { CREATE_TRAINING, GET_MY_TEAM_TRAININGS, UPDATE_TRAINING } from "../queries"

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

export const mockErrorMyTeamTrainingQuery = {
    request: {
        query: GET_MY_TEAM_TRAININGS,
    },
    error: new Error()
}

export const mockGetMyTeamTrainingsHandler= graphql.query('MyTeamTrainings', (req, res, ctx) => {
    return res(
        ctx.data({
            myTeamTrainings: mockTrainings
        })
    )
})

export const mockCreateTrainingMutation = {
    request: {
        query: CREATE_TRAINING,
        variables: {
            title: 'トレーニング',
            description: '',
            iconNumber: 0,
            finishedPatern: ''
        }
    },
    result: {
        data: {
            createTraining: {
                training: {
                    id: '1'
                }
            }
        }
    }
}

export const mockUpdateTrainingMutation = {
    request: {
        query: UPDATE_TRAINING,
        variables: {
            trainingId: '1',
            title: 'トレーニング1 update',
            description: '',
            iconNumber: 1,
            finishedPatern: '1'
        }
    },
    result: {
        data: {
            updateTraining: {
                training: {
                    id: '1'
                }
            }
        }
    }
}