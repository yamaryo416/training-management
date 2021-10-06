import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'
import { mockMyProfileQuery } from '../mocks/mockProfileData';
import { MainMenubar } from '../components/templates/MainMenubar';

import { TrainingCreateOrUpdateModal } from '../components/organisms/modal/TrainingCreateOrUpdateModal';
import { mockCreateTrainingMutation, mockMyTeamTrainingsQuery } from '../mocks/mockTrainingData';

beforeEach(() => {
    jest.setTimeout(30000)
})

afterEach(cleanup)

const mocks = [
    mockMyProfileQuery(true, false),
    mockCreateTrainingMutation,
    mockMyTeamTrainingsQuery
]

describe('Training Create', () => {
    describe('Success', () => {
        it('Sould display success message', async () => {
            render(
                <MockedProvider mocks={mocks}>
                    <RecoilRoot>
                        <MainMenubar
                            isJoinTeam={true}
                            isCoach={true}
                            isMyTeamPage={true}
                            isGuest={false}
                        />
                       <TrainingCreateOrUpdateModal />
                    </RecoilRoot>
                </MockedProvider>
            )
            userEvent.click(screen.getByText('メニュー'))
            userEvent.click(screen.getByText('トレーニング作成'))
            expect(await screen.findByTestId('modal-title')).toHaveTextContent('トレーニング作成')
            await userEvent.type(screen.queryByTestId('title-form'), 'トレーニング')
            userEvent.click(screen.queryByTestId('training-create-button'))
            expect(await screen.findByText('トレーニングを作成しました。')).toBeInTheDocument()
        })
    })
})