import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from "@testing-library/react"
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 

import { MyTeamTrainingSection } from "../../../templates/MyTeamTrainingSection";
import { mockMyTeamTrainingsQuery } from "../../../../mocks/mockTrainingData";
import { mockMyProfileQuery } from "../../../../mocks/mockProfileData";
import { mockMyFinishedSchedulesQuery } from "../../../../mocks/mockFinishedSchedulesData";
import userEvent from "@testing-library/user-event";

const mocks = [
    mockMyProfileQuery(true, false),
    mockMyTeamTrainingsQuery,
    mockMyFinishedSchedulesQuery
]

afterEach(cleanup)

describe('TrainingImplementationModal', () => {
    it('Should render correct contents', async() => {
        render(
            <MockedProvider mocks={mocks}>
                <RecoilRoot>
                    <MyTeamTrainingSection />
                </RecoilRoot>
            </MockedProvider>
        )
        expect(screen.queryByText('トレーニングリスト')).toBeInTheDocument()
        expect(await screen.findByTestId('1-training-title')).toHaveTextContent('トレーニング1')
        userEvent.click(await screen.findByTestId('1-training-implementation-list'))
        expect(await screen.findByText('トレーニング実施状況')).toBeInTheDocument()
        expect(await screen.findByTestId('training-implementation-title')).toHaveTextContent('トレーニング1')
        expect(screen.queryByText('30 回'))
    })
})