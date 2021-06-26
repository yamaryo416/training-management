import gql from 'graphql-tag';

// token

export const GET_TOKEN = gql`
    mutation GetToken($email: String!, $password: String!) {
        tokenAuth(email: $email, password: $password) {
            token
        }
    }
`;

// user

export const CREATE_GENERAL_USER = gql`
    mutation CreateGeneralUser($nickname: String! ,$email: String!, $password: String!) {
        createGeneralUser(input: { nickname: $nickname, email: $email, password: $password }){
            user {
                id
            }
         }
    }
`;

export const CREATE_GUEST_USER = gql`
    mutation CreateGuestUser($password: String!) {
        createGuestUser(input: { password: $password  }) {
            user {
                email
                id
            }
        }
    }
`;


export const DELETE_USER = gql`
    mutation DeleteUser($confirm: Boolean!) {
        deleteUser(input: { confirm: $confirm }) {
            user {
                id
            }
        }
    }
`

// profile

export const GET_MY_PROFILE = gql`
    query MyProfile{
        myProfile {
            id
            nickname
            user {
                id
            }
            teamBoard {
                introduction
                joinCount
                coach 
                team {
                    id
                    name
                    password
                    isLimitJoin
                }
            }
            isCoach
            isGuest
        }
    }
`;

export const UPDATE_MY_PROFILE_TEAM_BOARD  = gql`
    mutation UpdateMyProfileTeamBoard($teamBoardId: ID!) {
        updateProfileTeamBoard(input: { teamBoardId: $teamBoardId }) {
            profile {
                id
            }
        }
    }
`;

// team

export const GET_ONE_TEAM_FROM_NAME = gql`
    query OneTeamFromName($name: String!, $password: String!) {
        oneTeamFromName(name: $name, password: $password) {
            name
            teamBoard {
                id
            }
        }
    }
`;

export const GET_ONE_TEAM_FROM_ID = gql`
    query OneTeamFromId($teamId: ID!) {
        oneTeamFromId(teamId: $teamId) {
            id
            name
            teamBoard {
                id
                introduction
                joinCount
                coach
                schedules {
                    edges {
                        node {
                            id
                            training {
                                title
                                iconNumber
                            }
                            date
                        }
                    }
                }
                trainings {
                    edges {
                        node {
                            id
                            title
                            iconNumber
                        }
                    }
                }
            }
        }
    }
`;

export const CREATE_TEAM = gql`
    mutation CreateTeam($name: String!,$isLimitJoin: Boolean!, $password: String!) {
        createTeam(input: {name: $name, isLimitJoin: $isLimitJoin, password: $password}) {
            team {
                id
            }
        }
    }
`;

export const UPDATE_TEAM = gql`
    mutation UpdateTeam($name: String!, $isLimitJoin: Boolean!, $password: String!) {
        updateTeam(input: { name: $name, isLimitJoin: $isLimitJoin, password: $password }) {
            team {
                id
            }
        }
    }
`;

// teamBoard

export const GET_ALL_TEAM_BOARD = gql`
    query AllTeamBoard{
        allTeamBoard {
            edges {
                node {
                    id
                    introduction
                    joinCount
                    coach
                    team {
                        id
                        name
                    }
                }
            }
        }
    }
`;

// training

export const GET_MY_TEAM_TRAININGS = gql`
    query MyTeamTrainings{
        myTeamTrainings {
            edges {
                node {
                    id
                    title
                    description
                    iconNumber
                    finishedPatern
                    finishedSchedules {
                        edges {
                            node {
                                profile {
                                    id
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const CREATE_TRAINING = gql`
    mutation CreateTraining(
        $title: String!, 
        $description: String!,
        $iconNumber: Int!,
        $finishedPatern: String!
    ){
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
`;

export const UPDATE_TRAINING = gql`
    mutation UpdateTraining(
        $trainingId: ID!
        $title: String!, 
        $description: String!,
        $iconNumber: Int,
        $finishedPatern: String!
    ){ 
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
`;

export const DELETE_TRAINING = gql`
    mutation DeleteTraining($trainingId: ID!) {
        deleteTraining(input: {trainingId: $trainingId }) {
            training {
                id
            }
        }
    }
`

// schedule

export const GET_MY_TEAM_SCHEDULES = gql`
    query MyTeamSchedules{
        myTeamSchedules {
            edges {
                node {
                    id
                    training {
                        id
                        title
                        description
                        iconNumber
                        finishedPatern
                    }
                    date
                }
            }
        }
    }
`;

export const GET_ONE_DAY_SCHEDULES = gql`
    query OneDaySchedules($date : Date!) {
        myTeamSchedules(date: $date) {
            edges {
                node {
                    id
                    training {
                        title
                        description
                        iconNumber
                        finishedPatern
                    }
                    date
                    finishedCount
                    finishedSchedules {
                        edges {
                            node {
                                profile {
                                    id
                                    nickname
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const CREATE_SINGLE_SCHEDULE = gql`
    mutation CreateSingleSchedule($trainingId: ID!, $date: Date!) {
        createSchedule(input: { trainingId: $trainingId, date: $date}) {
            schedule {
                id
            }
        }
    }
`

export const CREATE_MANY_SCHEDULES = gql`
    mutation CreateManySchedules(
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
`;

export const DELETE_SCHEDULE = gql`
    mutation DeleteSchedule($scheduleId: ID!) {
        deleteSchedule(input: { scheduleId: $scheduleId }) {
            schedule{
                id
            }
        }
    }
`;

export const DELETE_MANY_SCHEDULES = gql`
    mutation DeleteManySchedules($startDate: Date!, $endDate: Date!, $trainingId: ID) {
        deleteManySchedules(input: { startDate: $startDate, endDate: $endDate, trainingId: $trainingId }) {
            schedule {
                id
            }
        }
    }
`