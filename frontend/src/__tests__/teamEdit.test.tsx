import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { mockMyProfileQuery } from '../mocks/mockProfileData';
import { MainMenubar } from '../components/templates/MainMenubar';
import { TeamEditModal } from '../components/organisms/modal/TeamEditModal';
import { mockUpdateTeamMutation } from '../mocks/mockTeamData';
import { mockUpdateTeamBoardIntroductionMutation } from '../mocks/mockTeamBoardData';

beforeEach(() => {
    jest.setTimeout(30000)
})

afterEach(cleanup)

const mocks = [
    mockMyProfileQuery(true, false),
    mockMyProfileQuery(true, false),
    mockUpdateTeamMutation,
    mockUpdateTeamBoardIntroductionMutation
]

describe('Team Edit', () => {
    describe('Success', () => {
        it('Sould display success message', async () => {
            render(
                <MockedProvider mocks={mocks} >
                    <RecoilRoot>
                        <MainMenubar
                            isJoinTeam={true}
                            isCoach={true}
                            isMyTeamPage={true}
                            isGuest={false}
                        />
                       <TeamEditModal />
                    </RecoilRoot>
                </MockedProvider>
            )
            userEvent.click(screen.getByText('メニュー'))
            userEvent.click(screen.getByText('チーム編集'))
            expect(await screen.findByTestId('modal-title')).toHaveTextContent('チーム編集')
            userEvent.clear(screen.getByTestId('name-form'))
            userEvent.type(screen.getByTestId('name-form'), 'team update')
            await userEvent.type(screen.getByTestId('introduction-form'), 'よろしくお願いします。')
            await new Promise(resolve => setTimeout(resolve, 1000));
            userEvent.click(screen.getByTestId('team-edit-button'))
            await new Promise(resolve => setTimeout(resolve, 1000));
            expect(screen.queryAllByText('チームを編集しました。')[0]).toBeInTheDocument()
        })
    })
})