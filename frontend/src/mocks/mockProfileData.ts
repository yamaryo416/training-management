import { GET_MY_PROFILE } from "../queries";

export const mockMyProfileQuery = (isCoach: boolean, isGuest: boolean) => { 
    return {
        request: {
            query: GET_MY_PROFILE,
        },
        result: {
            data: {
                myProfile: {
                    id: '1',
                    nickname: 'coach user',
                    user: {
                        id: '1'
                    },
                    teamBoard: {
                        introduction: '',
                        joinCount: 1,
                        coach: 'coach user',
                        team: {
                            id: '1',
                            name: 'team',
                            password: '0000',
                            isLimitJoin: false
                        }
                    },
                    isCoach,
                    isGuest
                }
            }
        }
    }
}

export const mockMyProfileWithoutTeamBoardQuery = (isCoach: boolean, isGuest: boolean) => { 
    return {
        request: {
            query: GET_MY_PROFILE,
        },
        result: {
            data: {
                myProfile: {
                    id: '1',
                    nickname: 'coach user',
                    user: {
                        id: '1'
                    },
                    teamBoard: null,
                    isCoach,
                    isGuest
                }
            }
        }
    }
}

export const mockMember = {
    node: {
        id: '1',
        nickname: 'coach user',
        user: {
            id: '1'
        },
        teamBoard: {
            id: '1',
            introduction: '',
            joinCount: 1,
            coach: 'coach user',
            team: {
                id: '1',
                name: 'team',
                password: '0000',
                isLimitJoin: false
            },
            schedules: {
                edges: null
            },
            trainings: {
                edges: null
            }
        },
        isCoach: true,
        finishedScheduleCount: 12,
        joinAt: '2021-01-02T01:23:45.000000',
        isGuest: false
    }
}