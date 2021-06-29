import { UPDATE_TEAM_BOARD_COACH, UPDATE_TEAM_BOARD_INTRODUCTION } from "../queries"

export const mockTeamBoard = {
    id: '1',
    introduction: '',
    joinCount: 1,
    coach: 'user',
    team: {
        id: '1',
        name: 'team',
        password: '0000',
        isLimitJoin: false
    },
    schedules: {
        edges: []
    },
    trainings: {
        edges: []
    }
}

export const mockUpdateTeamBoardIntroductionMutation = {
    request: {
        query: UPDATE_TEAM_BOARD_INTRODUCTION,
        variables: {
            introduction: 'よろしくお願いします。'
        }
    },
    result: {
        data: {
            updateTeamBoardIntroduction: {
                teamBoard: {
                    id: '1'
                }
            }
        }
    }
}


export const mockUpdateTeamBoardCoachMutation = {
    request: {
        query: UPDATE_TEAM_BOARD_COACH,
        variables: {
            profileId: '2'
        }
    },
    result: {
        data: {
            updateTeamBoardCoach: {
                teamBoard: {
                    id: '1'
                }
            }
        }
    }
}