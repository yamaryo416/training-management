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

# training

GET_MY_TEAM_TRAININGS_QUERY = '''
    query myTeamTrainings {
        myTeamTrainings {
            edges {
                node {
                    id
                    title
               }
           }
       }
   }
'''

GET_ONE_TEAM_TRAINING_QUERY = '''
    query myTeamTrainings($title: String!) {
        myTeamTrainings(title: $title) {
            edges {
                node {
                    id
                    title
               }
           }
       }
   }
'''

CREATE_TRAINING_MUTATION = '''
    mutation createTraining(
        $title: String!,
        $description: String!,
        $iconNumber: Int!,
        $finishedPatern: String!
    ) {
        createTraining(input: {
            title: $title,
            description: $description,
            iconNumber: $iconNumber,
            finishedPatern: $finishedPatern
        }) {
            training {
                id
            }
        }        
    }
'''

UPDATE_TRAINING_MUTATION = '''
    mutation updateTraining(
        $trainingId: ID!,
        $title: String!,
        $description: String!,
        $iconNumber: Int!,
        $finishedPatern: String!
    ) {
        updateTraining(input: {
            trainingId: $trainingId,
            title: $title,
            description: $description,
            iconNumber: $iconNumber,
            finishedPatern: $finishedPatern
        }) {
            training {
                id
            }
        }        
    }
'''

DELETE_TRAINING_MUTATION = '''
    mutation deleteTraining($trainingId: ID!) {
        deleteTraining(input: { trainingId: $trainingId }) {
            training {
                id
            }
        }
    }
'''

# schedule

GET_MY_TEAM_SCHEDULES = '''
   query myTeamSchedules {
        myTeamSchedules {
            edges {
                node {
                    id
               }
           }
       }
   }
'''

GET_MY_TEAM_ONE_DAY_SCHEDULES_QUERY = '''
   query myTeamSchedules($date: Date!) {
       myTeamSchedules(date: $date) {
           edges {
               node {
                   id
               }
           }
       }
   }
'''

GET_MY_TEAM_ONE_SCHEDULE_QUERY = '''
   query myTeamSchedules($date: Date!, $training_Title: String!) {
       myTeamSchedules(date: $date, training_Title: $training_Title) {
           edges {
               node {
                   id
               }
           }
       }
   }
'''

CREATE_SCHEDULE_MUTATION = '''
    mutation createSchedule($trainingId: ID!, $date: Date!) {
        createSchedule(input: { trainingId: $trainingId, date: $date }) {
            schedule {
                id
            }
        }
    }
'''

DELETE_SCHEDULE_MUTATION = '''
    mutation deleteSchedule($scheduleId: ID!) {
        deleteSchedule(input: { scheduleId: $scheduleId} ) {
            schedule {
                id
            }
        }
    }
'''

DELETE_MANY_SCHEDULES_MUTATION = '''
    mutation deleteManySchedules(
        $startDate: Date!,
        $endDate: Date!,
        $trainingId: ID
    ) {
       deleteManySchedules(input: {
            startDate: $startDate,
            endDate: $endDate,
            trainingId: $trainingId
        }) {
            schedule {
               id
           }
       }
    }
'''

CREATE_MANY_SCHEDULES_MUTATION= '''
    mutation createManySchedules(
        $trainingId: ID!,
        $startDate: Date!,
        $endDate: Date!,
        $dayOfWeek: String!
    ) {
        createManySchedules(input: {
            trainingId: $trainingId,
            startDate: $startDate,
            endDate: $endDate,
            dayOfWeek: $dayOfWeek
        }) {
            schedule {
                id
            }
        }
    }
'''

# finished_schedule

GET_MY_TEAM_FINISHED_SCHEDULES_QUERY = '''
    query myTeamFinishedSchedules {
        myTeamFinishedSchedules {
            edges {
                node {
                    id
                }
            }
        }
    }
'''

GET_MY_TEAM_ONE_FINISHED_SCHEDULE_QUERY = '''
    query myTeamFinishedSchedules {
        myTeamFinishedSchedules {
            edges {
                node {
                    id
                }
            }
        }
    }
'''

CREATE_FINISHED_SCHEDULE_MUTATION = '''
    mutation createFinishedSchedule($scheduleId: ID!, $count: Int!, $load: Int!, $distance: Int!, $minitus: Int!, $comment: String!) {
        createFinishedSchedule(input: {
            scheduleId: $scheduleId,
            count: $count,
            load: $load,
            distance: $distance,
            minitus: $minitus,
            comment: $comment
        }) {
            finishedSchedule {
                id
            }
        }
    }
'''

DELETE_FINISHED_SCHEDULE_MUTATION = '''
    mutation deleteFinishedSchedule($scheduleId: ID!) {
        deleteFinishedSchedule(input: { scheduleId: $scheduleId }) {
            finishedSchedule {
                id
            }
        }
    }
'''