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