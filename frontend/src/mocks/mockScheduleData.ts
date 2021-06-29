import moment from "moment"
import { graphql } from 'msw'

import { TODAY } from "../../constants"
import { mockTrainingWithIcon, mockTrainingWithoutIcon } from "./mockTrainingData"
import { GET_ONE_DAY_SCHEDULES, GET_MY_TEAM_SCHEDULES, CREATE_SINGLE_SCHEDULE, CREATE_MANY_SCHEDULES } from "../queries"

export const mockSchedule = (id: string, dateDiff: number) => {
    return {
        id,
        date: moment(TODAY).add(dateDiff, 'days').format("YYYY-MM-DD"),
        training: mockTrainingWithIcon(id, '1'),
        finishedCount: 0,
        finishedSchedules: {
            edges : []
        }
    }
}

export const mockScheduleWithoutIcon = (id: string) => {
    return {
        id,
        date: TODAY,
        training: mockTrainingWithoutIcon(id),
        finishedCount: 0,
        finishedSchedules: {
            edges: []
        }
    }
}

export const mockScheduleWithFinisheMember = (id: string, dateDiff: number) => {
    return {
        id,
        date: moment(TODAY).add(dateDiff, 'days').format("YYYY-MM-DD"),
        training: mockTrainingWithIcon(id, '1'),
        finishedCount: 1,
        finishedSchedules: {
            edges: [
                { node:
                    { profile: 
                        {
                            id: '1',
                            nickname: 'coach user'
                        }
                    }
                }
            ]
        }
    }
}

export const mockSchedules = {
    edges: [
        { node: mockSchedule('1', 0) },
        { node: mockScheduleWithoutIcon('2')},
        { node: mockSchedule('3', -7) },
        { node: mockSchedule('4', 7) },
        { node: mockSchedule('5', -1) },
        { node: mockSchedule('6', 1) },
    ]
}

export const mockTodaySchedulesQuery = {
    request: {
        query: GET_ONE_DAY_SCHEDULES,
        variables: {
            date: TODAY
        },
    },
    result: {
        data: {
            myTeamSchedules: {
                edges: [
                    { node: mockSchedule('1', 0) },
                    { node: mockScheduleWithoutIcon('2') },
                    { node: mockScheduleWithFinisheMember('3', 0) }
                ]
            }
        }
    }
}

export const mockPreviousSchedulesQuery = {
    request: {
        query: GET_ONE_DAY_SCHEDULES,
        variables: {
            date: moment(TODAY).add(-1, 'days').format('YYYY-MM-DD')
        },
    },
    result: {
        data: {
            myTeamSchedules: {
                edges: [
                    { node: mockScheduleWithFinisheMember('4', -1) },
                    { node: mockSchedule('5', -1) },
                ]
            }
        }
    }
}

export const mockNextSchedulesQuery = {
    request: {
        query: GET_ONE_DAY_SCHEDULES,
        variables: {
            date: moment(TODAY).add(1, 'days').format('YYYY-MM-DD')
        },
    },
    result: {
        data: {
            myTeamSchedules: {
                edges: [
                    { node: mockSchedule('6', 1) },
                ]
            }
        }
    }
}

export const MockAbsentShcduleQuery = {
    request: {
        query: GET_ONE_DAY_SCHEDULES,
        variables: {
            date: TODAY
        },
    },
    result: {
        data: {
            myTeamSchedules: {
                edges: []
            }
        }
    }
}

export const mockErrorScheduleQuery = {
    request: {
        query: GET_ONE_DAY_SCHEDULES,
        variables: {
            date: TODAY
        },
    },
    error: new Error()
}

export const mockMyTeamSchedulesQuery = {
    request: {
        query: GET_MY_TEAM_SCHEDULES,
    },
    result: {
        data: {
            myTeamSchedules: {
                edges: [
                    { node: mockSchedule('1', 0) },
                    { node: mockSchedule('2', 7) },
                ]
            }
        }
    }
}

export const mockErrorMyTeamScheduleQuery = {
    request: {
        query: GET_MY_TEAM_SCHEDULES,
        variables: {
            date: TODAY
        },
    },
    error: new Error()
}

export const mockGetMyTeamSchedulesHandler = graphql.query('MyTeamSchedules', (req, res, ctx) => {
    return res(
        ctx.data({
            myTeamSchedules: {
                edges: [
                    { node: mockSchedule('1', 0) },
                    { node: mockScheduleWithoutIcon('2') },
                    { node: mockSchedule('3', 7) },
                    { node: mockSchedule('4', -1) },
                    { node: mockSchedule('5', 7) },
                ]
            }
        })
    )
})

export const mockCreateSingleScheduleMutation = {
    request: {
        query: CREATE_SINGLE_SCHEDULE,
        variables: {
            trainingId: '1',
            date: TODAY,
        },
    },
    result: {
        data: {
            createSchedule: {
                id: '1'
            }
        }
    }
}

export const mockCreateManySchedulesMutation = {
    request: {
        query: CREATE_MANY_SCHEDULES,
        variables: {
            trainingId: '1',
            startDate: TODAY,
            endDate: moment(TODAY).add(7, 'days').format('YYYY-MM-DD'),
            dayOfWeek: '0123456'
        },
    },
    result: {
        data: {
            createManySchedules: {
                schedule: {
                    id: '1'
                }
            }
        }
    }
}

export const mockGetOneDaySchedulesHandler = graphql.query('OneDaySchedules', (req, res, ctx) => {
    const { date } = req.variables

    if (date === moment(TODAY).add(1, 'days').format('YYYY-MM-DD')) {
        return res(
            ctx.data({
                myTeamSchedules: {
                    edges: [
                        { node: mockSchedule('3', 1) }
                    ]
                }
            })
        )
    }
    if (date === moment(TODAY).add(-1, 'days').format('YYYY-MM-DD')) {
        return res(
            ctx.data({
                myTeamSchedules: {
                    edges: [
                        { node: mockSchedule('4', -1) }
                    ]
                }
            })
        )
    }
    return res(
        ctx.data({
            myTeamSchedules: {
                edges: [
                    { node: mockSchedule('1', 0) },
                    { node: mockScheduleWithoutIcon('2') }
                ]
            }
        })
    )
})

