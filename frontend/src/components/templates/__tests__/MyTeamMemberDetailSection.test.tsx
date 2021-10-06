import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 

import { mockMyProfileQuery } from '../../../mocks/mockProfileData';
import { mockErrorMyTeamTrainingQuery, mockMyTeamTrainingsQuery } from '../../../mocks/mockTrainingData';
import { mockOneMemberFinishedSchedulesQuery } from '../../../mocks/mockFinishedSchedulesData';
import { MyTeamMemberDetailSection } from '../MyTeamMemberDetailSection';


afterEach(cleanup)

const mocks = [
    mockMyProfileQuery(true, false),
    mockMyTeamTrainingsQuery,
    mockOneMemberFinishedSchedulesQuery
]

const mocksErrorTrainingData = [
    mockMyProfileQuery(true, false),
    mockErrorMyTeamTrainingQuery,
    mockOneMemberFinishedSchedulesQuery
]

describe('MyTeamMemberDetailSection', () => {
    it('Should render without error', () => {
        render(
            <MockedProvider mocks={mocks}>
                <RecoilRoot>
                    <MyTeamMemberDetailSection />
                </RecoilRoot>
            </MockedProvider>
        )
        expect(screen.queryAllByText('Loading...')[0]).toBeInTheDocument()
    })

    it('Should render correct contents', async () => {
        render(
            <MockedProvider mocks={mocks}>
                <RecoilRoot>
                    <MyTeamMemberDetailSection />
                </RecoilRoot>
            </MockedProvider>
        )
        expect(await screen.findByText('メンバー詳細')).toBeInTheDocument()
        expect(screen.getByTestId('one-member-detail-nickname')).toHaveTextContent('coach user')
        expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', "/icon/white-barbell.png")
        expect(screen.getByTestId('1-training-contents')).toHaveTextContent('トレーニング1')
        expect(screen.getByTestId('1-finished-count')).toHaveTextContent('3回')
        expect(screen.getByTestId('1-finished-implementation-list'))
        expect(screen.getAllByRole('img')[10]).toHaveAttribute('src', '/icon/white-cycling.png')
        expect(screen.getByTestId('11-training-contents')).toHaveTextContent('トレーニング11')
        expect(screen.getByTestId('11-finished-count')).toHaveTextContent('0回')
    })

    it('Should render error message', async () => {
        render(
            <MockedProvider mocks={mocksErrorTrainingData}>
                <RecoilRoot>
                    <MyTeamMemberDetailSection />
                </RecoilRoot>
            </MockedProvider>
        )
        expect(await screen.findByText('データの取得に失敗しました。')).toBeInTheDocument()
    })

})