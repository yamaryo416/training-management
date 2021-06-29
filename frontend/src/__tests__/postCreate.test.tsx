import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { mockMyProfileQuery } from '../mocks/mockProfileData';
import { TeamBoardPost } from '../components/organisms/team/TeamBoardPost';
import { mockCreatePostMutation, mockFirstMyTeamPostsQuery } from '../mocks/mockPostData';

afterEach(cleanup)

const mocks = [
    mockMyProfileQuery(true, false),
    mockFirstMyTeamPostsQuery,
    mockCreatePostMutation,
    mockFirstMyTeamPostsQuery
]

describe('Post create', () => {
    describe('Success', () => {
        it('Should display success message', async () => {
            render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <RecoilRoot>
                        <TeamBoardPost />
                    </RecoilRoot>
                </MockedProvider>
            )
            
            userEvent.type(await screen.findByTestId('post-text-form'), 'post')
            await new Promise(resolve => setTimeout(resolve, 1000));
            userEvent.click(screen.getByTestId('create-post-button'))
            expect(await screen.findByText('投稿しました。')).toBeInTheDocument()
        })
    })
})