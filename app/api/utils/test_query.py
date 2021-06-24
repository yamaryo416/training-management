# user

CREATE_GENERAL_USER_MUTATION = '''
   mutation createGeneralUser($nickname: String!, $email: String!, $password: String!) {
       createGeneralUser(input: { nickname: $nickname, email: $email, password: $password }) {
           user {
               id
           }
       }
   }
'''

CREATE_GUEST_USER_MUTATION = '''
   mutation createGuestUser($password: String!) {
       createGuestUser(input: { password: $password }) {
           user {
               id
           }
       }
   }
'''

DELETE_USER_MUTATION = '''
   mutation deleteUser($confirm: Boolean!) {
       deleteUser(input: { confirm: $confirm }) {
           user {
               id
           }
       }
   }
'''

# profile

GET_MY_PROFILE_QUERY = '''
    query myProfile {
        myProfile {
            id
            nickname
        }
    }
'''

GET_MY_TEAM_MEMBER_QUERY = '''
    query myTeamMember {
        myTeamMember {
            edges {
                node {
                    id
                    nickname
               }
           }
       }
   }
'''

GET_ONE_TEAM_MEMBER_QUERY = '''
     query myTeamMember($nickname: String!) {
         myTeamMember(nickname: $nickname) {
             edges {
                 node {
                     id
                 }
             }
         }
     }
'''

UPDATE_PROFILE_NICKNAME_MUTATION = '''
     mutation updateProfileNickname($nickname: String!) {
         updateProfileNickname(input: { nickname: $nickname }) {
             profile {
                 id
             }
         }
     }
'''

UPDATE_PROFILE_TEAM_BOARD_MUTATION= '''
     mutation updateProfileTeamBoard($teamBoardId: ID!) {
         updateProfileTeamBoard(input: { teamBoardId: $teamBoardId }) {
             profile {
                 id
                 nickname
             }
         }
     }
 '''

DELETE_MY_PROFILE_TEAM_BOARD_MUTATION= '''
     mutation deleteMyProfileTeamBoard($confirm: Boolean!) {
         deleteMyProfileTeamBoard(input: { confirm: $confirm}) {
             profile {
                 id
             }
         }
     }
 '''

DELETE_ONE_PROFILE_TEAM_BOARD_MUTATION= '''
     mutation deleteOneProfileTeamBoard($profileId: ID!) {
         deleteOneProfileTeamBoard(input: { profileId: $profileId}) {
             profile {
                 id
             }
         }
     }
 '''

# team

GET_ONE_TEAM_FROM_ID_QUERY = '''
   query oneTeamFromId($teamId: ID!) {
       oneTeamFromId(teamId: $teamId) {
           id
           name
           password
       }
   }
'''

GET_ONE_TEAM_FROM_NAME_QUERY = '''
    query oneTeamFromName($name: String!, $password: String!) {
        oneTeamFromName(name: $name, password: $password) {
            id
            name
            teamBoard {
                id
            }
        }
    }
'''

CREATE_TEAM_MUTATION = '''
   mutation createTeam($name: String!, $isLimitJoin: Boolean!, $password: String!) {
       createTeam(input: {name: $name, isLimitJoin: $isLimitJoin, password: $password}) {
           team {
               id
           }
       }
   }
'''

UPDATE_TEAM_MUTATION = '''
    mutation updateTeam($name: String!, $isLimitJoin: Boolean!, $password: String!) {
        updateTeam(input: {name: $name, isLimitJoin: $isLimitJoin, password: $password}) {
            team {
                id
            }
        }
    }
'''

# team_board

GET_ALL_TEAM_BOARD_QUERY = '''
    query allTeamBoard {
        allTeamBoard {
            edges {
                node {
                    team {
                        name
                    }
                    joinCount
                }
            }
        }
    }
'''

UPDATE_TEAM_BOARD_INTRODUCTION_MUTATION= '''
    mutation updateTeamBoardIntroduction($introduction: String!) {
        updateTeamBoardIntroduction(input: { introduction: $introduction }) {
            teamBoard {
                id
            }
        }
    }
'''

UPDATE_TEAM_BOARD_COACH_MUTATION= '''
    mutation updateTeamBoardCoach($profileId: ID!) {
        updateTeamBoardCoach(input: { profileId: $profileId }) {
            teamBoard {
                id
            }
        }
    }
'''