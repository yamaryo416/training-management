import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { mockMyProfileQuery } from '../mocks/mockProfileData';
import { TrainingCreateOrUpdateModal } from '../components/organisms/modal/TrainingCreateOrUpdateModal';
import { mockMyTeamTrainingsQuery, mockUpdateTrainingMutation } from '../mocks/mockTrainingData';
import { MyTeamTrainingSection } from '../components/templates/MyTeamTrainingSection';
import { mockMyFinishedSchedulesQuery } from '../mocks/mockFinishedSchedulesData';

const mocks = [
    mockMyProfileQuery(true, false),
    mockUpdateTrainingMutation,
    mockMyFinishedSchedulesQuery,
    mockMyTeamTrainingsQuery,
    mockMyTeamTrainingsQuery
]

beforeEach(() => {
    jest.setTimeout(50000)
})

afterEach(cleanup)

describe('Training Edit', () => {
    describe('Success', () => {
        it('Sould display success message', async () => {
            render(
                <MockedProvider mocks={mocks}>
                    <RecoilRoot>
                        <MyTeamTrainingSection />
                        <TrainingCreateOrUpdateModal />
                    </RecoilRoot>
                </MockedProvider>
            )
            userEvent.click(await screen.findByTestId('1-training-edit-icon'))
            expect(await screen.findByTestId('modal-title')).toHaveTextContent('トレーニング編集')
            expect(screen.queryByTestId('title-form')).toHaveValue('トレーニング1')
            userEvent.clear(screen.getByTestId('title-form'))
            await userEvent.type(screen.getByTestId('title-form'), 'トレーニング1 update')
            await new Promise(resolve => setTimeout(resolve, 1000));
            userEvent.click(screen.queryByTestId('training-create-button'))
            await new Promise(resolve => setTimeout(resolve, 1000));
            expect(screen.queryAllByText('トレーニングを編集しました。')[0]).toBeInTheDocument()
        })
    })
})