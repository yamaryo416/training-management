import { CREATE_TEAM, GET_ONE_TEAM_FROM_NAME, UPDATE_TEAM } from "../queries";

export const mockOneTeamFromNameQuery = {
    request: {
        query: GET_ONE_TEAM_FROM_NAME,
        variables: {
            name: 'team',
            password: '0000'
        }
    },
    result: {
        data: {
            oneTeamFromName: {
                name: 'team',
                teamBoard: {
                    id: '1'
                }
            }
        }
    }
}

export const mockErrorOneTeamFromNameQuery = {
    request: {
        query: GET_ONE_TEAM_FROM_NAME,
        variables: {
            name: 'team',
            password: '0000'
        }
    },
    error: new Error()
}

export const mockCreateTeamMutation = {
    request: {
        query: CREATE_TEAM,
        variables: {
            name: 'team',
            isLimitJoin: false,
            password: '0000',
        }
    },
    result: {
        data: {
            createTeam: {
                team: {
                    id: '1'
                }
            }
        }
    }
}

export const mockErrorCreateTeamMutation = {
    request: {
        query: CREATE_TEAM,
        variables: {
            name: 'team',
            isLimitJoin: false,
            password: '0000',
        }
    },
    error: new Error()
}
