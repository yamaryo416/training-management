import moment from "moment"

import { TODAY } from "../../constants"
import { mockTrainingWithIcon, mockTrainingWithoutIcon } from "./mockTrainingData"

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




