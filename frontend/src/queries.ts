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