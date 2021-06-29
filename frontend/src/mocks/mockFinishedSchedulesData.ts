import moment from "moment"
import { graphql } from 'msw'

import { GET_MY_FINISHED_SCHEDULES, GET_ONE_MEMBER_FINISHED_SCHEDULES, GET_MY_TEAM_FINISHED_SCHEDULES, CREATE_FINISHED_SCHEDULE, DELETE_FINISHED_SCHEDULE } from "../queries"

export const mockFinishedSchedule = (id: string, trainingId: string, scheduleId: string, dateDiff: number) => {
    return {
        id,
        profile: {
            id: '1',
            nickname: 'coach user'
        },
        training: {
            id: trainingId,
            title: `トレーニング${trainingId}`,
            finishedPatern: '1'
        },
        schedule: {
            id: scheduleId,
            date: moment().add(dateDiff, 'days').format('YYYY-MM-DD')
        },
        count: 10,
        load: 0,
        distance: 0,
        minitus: 0,
        comment: ''
    }
}

export const mockOtherFinishedSchedule = (id: string, trainingId: string, scheduleId: string, dateDiff: number) => {
    return {
        id,
        profile: {
            id: '2',
            nickname: 'user1'
        },
        training: {
            id: trainingId,
            title: `トレーニング${trainingId}`,
            finishedPatern: '1'
        },
        schedule: {
            id: scheduleId,
            date: moment().add(dateDiff, 'days').format('YYYY-MM-DD')
        },
        count: 10,
        load: 0,
        distance: 0,
        minitus: 0,
        comment: ''
    }
}

export const mockMyFinishedSchedulesQuery = {
    request: {
        query: GET_MY_FINISHED_SCHEDULES,
    },
    result: {
        data: {
            myFinishedSchedules: {
                edges: [
                    { node: mockFinishedSchedule('1', '1', '1', 0) },
                    { node: mockFinishedSchedule('2', '1', '2', -1) },
                    { node: mockFinishedSchedule('3', '1', '3', -2) },
                ]
            }
        }
    }
}

export const mockOneMemberFinishedSchedulesQuery = {
    request: {
        query: GET_ONE_MEMBER_FINISHED_SCHEDULES,
        variables: { }
    },
    result: {
        data: {
            myTeamFinishedSchedules: {
                edges: [
                    { node: mockFinishedSchedule('1', '1', '1', 0) },
                    { node: mockFinishedSchedule('2', '1', '2', -1) },
                    { node: mockFinishedSchedule('3', '1', '3', -2) },
                ]
            }
        }
    }
}

export const mockMyTeamFinishedSchedulesQuery = {
    request: {
        query: GET_MY_TEAM_FINISHED_SCHEDULES,
    },
    result: {
        data: {
            myTeamFinishedSchedules: {
                edges: [
                    { node: mockFinishedSchedule('1', '1', '1', 0) },
                    { node: mockFinishedSchedule('2', '1', '2', -1) },
                    { node: mockFinishedSchedule('3', '1', '3', -2) },
                    { node: mockOtherFinishedSchedule('4', '1', '1', 0) },
                    { node: mockOtherFinishedSchedule('5', '1', '2', -1) },
                    { node: mockOtherFinishedSchedule('6', '1', '3', -2) },
                ]
            }
        }
    }
}

export const mockCreateFinishedScheduleMutation = {
    request: {
        query: CREATE_FINISHED_SCHEDULE,
        variables: {
            scheduleId: '1',
            count: 10,
            load: 0,
            distance: 0,
            minitus: 0,
            comment: ''
        }
    },
    result: {
        data: {
            finishedScheduleMember: {
                id: '1'
            }
        }
    }
}

export const mockErrorCreateFinishedScheduleMutation = {
    request: {
        query: CREATE_FINISHED_SCHEDULE,
        variables: {
            scheduleId: '1',
            count: 0,
            load: 0,
            distance: 0,
            minitus: 0,
            comment: ''
        }
    },
    error: new Error('Count is required')
}

export const mockDeleteFinishedScheduleMutation = {
    request: {
        query: DELETE_FINISHED_SCHEDULE,
        variables: {
            scheduleId: '3'
        }
    },
    result: {
        data: {
            deleteFinishedScheduleMember: {
                id: '3'
            }
        }
    }
}

export const mockGetMyFinishedSchedulesHandler = graphql.query('MyFinishedSchedules', (req, res, ctx) => {
    return res(
        ctx.data({
            myFinishedSchedules: {
                edges: [
                    { node: mockFinishedSchedule('1', '1', '1', 0) }
                ]
            }
        })
    )
})

export const mockGetMyTeamFinishedSchedulesHandler = graphql.query('MyTeamFinishedSchedules', (req, res, ctx) => {
    return res(
        ctx.data({
            myTeamFinishedSchedules: {
                edges: [
                    { node: mockFinishedSchedule('1', '1', '1', 0) }
                ]
            }
        })
    )
})