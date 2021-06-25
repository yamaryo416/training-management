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