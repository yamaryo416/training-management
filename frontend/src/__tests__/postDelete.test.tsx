import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { mockMyProfileQuery } from '../mocks/mockProfileData';
import { TeamBoardPost } from '../components/organisms/team/TeamBoardPost';
import { mockDeletePostMutation, mockFirstMyTeamPostsQuery } from '../mocks/mockPostData';
import { ConfirmPostDeleteModal } from '../components/organisms/modal/ConfirmPostDeleteModal';

beforeEach(() => {
    jest.setTimeout(30000)
})

afterEach(cleanup)

const mocks = [
    mockMyProfileQuery(true, false),
    mockFirstMyTeamPostsQuery,
    mockDeletePostMutation,
    mockFirstMyTeamPostsQuery
]

describe('Post delete', () => {
    describe('Success', () => {
        it('Should display success message', async () => {
            render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <RecoilRoot>
                        <TeamBoardPost />
                        <ConfirmPostDeleteModal />
                    </RecoilRoot>
                </MockedProvider>
            )
            expect(await screen.findByText('post1'))
            userEvent.click(screen.queryByTestId('1-post-delete-icon'))
            expect(await screen.findByTestId('delete-post-text')).toHaveTextContent('post1')
            userEvent.click(screen.queryByTestId('delete-post-button'))
            expect(await screen.findByText('投稿を削除しました。')).toBeInTheDocument()
        })
    })
})