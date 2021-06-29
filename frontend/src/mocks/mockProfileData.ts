import { graphql } from 'msw'

import { GET_MY_PROFILE, GET_MY_TEAM_MEMBER, UPDATE_MY_PROFILE_NICKNAME } from "../queries";
import { NUM_PAGE } from '../../constants';

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

export const mockMyTeamCoach = {
    id: '1',
    nickname: 'coach user',
    isCoach: true,
    finishedScheduleCount: 1,
    joinAt: '2021-01-02T01:23:45.000000'
}

export const mockMyTeamMember = (id: string) => {
    return {
        id,
        nickname: `user${id}`,
        isCoach: false,
        finishedScheduleCount: Number(id),
        joinAt: '2021-01-02T01:23:45.000000'
    }
}


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


export const mockFirstMyTeamMemberQuery = {
    request: {
        query: GET_MY_TEAM_MEMBER,
        variables: {
            first: NUM_PAGE
        }
    },
    result: {
        data: {
            myTeamMember: {
                edges: [
                    { node: mockMyTeamCoach },
                    { node: mockMyTeamMember('2') },
                    { node: mockMyTeamMember('3') },
                    { node: mockMyTeamMember('4') },
                    { node: mockMyTeamMember('5') },
                    { node: mockMyTeamMember('6') },
                    { node: mockMyTeamMember('7') },
                    { node: mockMyTeamMember('8') },
                    { node: mockMyTeamMember('9') },
                    { node: mockMyTeamMember('10') },
                ],
                pageInfo: {
                    endCursor: '10',
                    hasNextPage: true
                }
            }
        }
    }
}


export const mockSecondMyTeamMemberQuery = {
    request: {
        query: GET_MY_TEAM_MEMBER,
        variables: {
            first: NUM_PAGE,
            nickname: '',
            after: '10'
        }
    },
    result: {
        data: {
            myTeamMember: {
                edges: [
                    { node: mockMyTeamMember('11') },
                    { node: mockMyTeamMember('12') },
                ],
                pageInfo: {
                    endCursor: '12',
                    hasNextPage: false
                }
            }
        }
    }
}

export const mockFoundMyTeamMemberQuery = {
    request: {
        query: GET_MY_TEAM_MEMBER,
        variables: {
            first: NUM_PAGE,
            nickname: '2',
            after: null
        }
    },
    result: {
        data: {
            myTeamMember: {
                edges: [
                    { node: mockMyTeamMember('2') },
                    { node: mockMyTeamMember('12') }
                ],
                pageInfo: {
                    endCursor: '2',
                    hasNextPage: false
                }
            }
        }
    }
}

export const mockNotFoundMyTeamMemberQuery = {
    request: {
        query: GET_MY_TEAM_MEMBER,
        variables: {
            first: NUM_PAGE,
            nickname: 'hoge',
            after: null
        }
    },
    result: {
        data: {
            myTeamMember: {
                edges: [],
                pageInfo: {
                    endCursor: null,
                    hasNextPage: false
                }
            }
        }
    }
}

export const mockErrorMyTeamMemberQuery = {
    request: {
        query: GET_MY_TEAM_MEMBER,
        variables: {
            first: NUM_PAGE
        }
    },
    error: new Error()
}

export const mockGetMyProfileHandler = graphql.query('MyProfile', (req, res, ctx) => {
    return res(
        ctx.data({
            myProfile: {
                id: '1',
                nickname: 'coach user',
                user: {
                    id: '1',
                },
                teamBoard: {
                    introduction: '',
                    joinCount: 2,
                    coach: 'coach user',
                    team: {
                        id: '1',
                        name: 'team',
                        password: '0000',
                        isLimitJoin: false,
                    }
                },
                isCoach: true,
                isGuest: false,
            }
        })
    )
})

export const mockGetMyTeamMemberHandler = graphql.query('MyTeamMember', (req, res, ctx) => {
    return res(
        ctx.data({
            myTeamMember: {
                edges: [
                    { node: mockMyTeamCoach },
                    { node: mockMyTeamMember('2') },
                    { node: mockMyTeamMember('3') },
                ],
                pageInfo: {
                    endCursor: '3',
                    hasNextPage: false
                }
            },
        })
    )
})

export const mockUpdateMyProfileNicknameMutation = {
    request: {
        query: UPDATE_MY_PROFILE_NICKNAME,
        variables: {
            nickname: 'user update'
        }
    },
    result: {
        data: {
            updateProfileNickname: {
                profile: {
                    id: '2'
                }
            }
        }
    }
}