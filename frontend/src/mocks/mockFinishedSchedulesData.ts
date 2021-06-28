import moment from "moment"
import { graphql } from 'msw'

import { GET_MY_FINISHED_SCHEDULES } from "../queries"

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