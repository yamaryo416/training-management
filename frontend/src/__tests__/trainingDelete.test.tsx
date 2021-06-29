import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { mockMyProfileQuery } from '../mocks/mockProfileData';
import { mockDeleteTrainingMutation, mockMyTeamTrainingsQuery } from '../mocks/mockTrainingData';
import { MyTeamTrainingSection } from '../components/templates/MyTeamTrainingSection';
import { ConfirmTrainingDeleteModal } from '../components/organisms/modal/ConfirmTrainingDeleteModal';
import { mockMyFinishedSchedulesQuery } from '../mocks/mockFinishedSchedulesData';

beforeEach(() => {
    jest.setTimeout(30000)
})

afterEach(cleanup)

const mocks = [
    mockMyProfileQuery(true, false),
    mockMyTeamTrainingsQuery,
    mockMyFinishedSchedulesQuery,
    mockDeleteTrainingMutation,
    mockMyTeamTrainingsQuery,
]

describe('Training Delete', () => {
    describe('Success', () => {
        it('Sould display success message', async () => {
            render(
                <MockedProvider mocks={mocks}>
                    <RecoilRoot>
                        <MyTeamTrainingSection />
                        <ConfirmTrainingDeleteModal />
                    </RecoilRoot>
                </MockedProvider>
            )
            userEvent.click(await screen.findByTestId('1-training-delete-icon'))
            expect(await screen.findByTestId('delete-training-title')).toHaveTextContent('トレーニング1')
            userEvent.click(screen.queryByTestId('training-delete-button'))
            expect(await screen.findByText('トレーニングを削除しました。')).toBeInTheDocument()
        })
    })
})