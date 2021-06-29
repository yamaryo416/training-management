import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { mockMyProfileQuery, mockFirstMyTeamMemberQuery } from '../mocks/mockProfileData';
import { MyTeamMemberDetailSection } from '../components/templates/MyTeamMemberDetailSection';
import { MyTeamMemberListSection } from '../components/templates/MyTeamMemberListSection';
import { mockMyTeamTrainingsQuery } from '../mocks/mockTrainingData';
import { mockMyFinishedSchedulesQuery, mockOneMemberFinishedSchedulesQuery, mockOtherFinishedScheduleQuery, mockSecondMemberFinishedSchedulesQuery } from '../mocks/mockFinishedSchedulesData';
import { ConfirmHandOffCoachModal } from '../components/organisms/modal/ConfirmHandOffCoachModal';
import { mockUpdateTeamBoardCoachMutation } from '../mocks/mockTeamBoardData';

jest.mock("next/router", () => ({
    useRouter() {
      return {
        push: () => null
      };
    }
  }));

beforeEach(() => {
    jest.setTimeout(30000)
})

afterEach(cleanup)

const mocks = [
    mockFirstMyTeamMemberQuery,
    mockMyProfileQuery(true, false),
    mockMyTeamTrainingsQuery,
    mockMyFinishedSchedulesQuery,
    mockOneMemberFinishedSchedulesQuery,
    mockSecondMemberFinishedSchedulesQuery,
    mockOtherFinishedScheduleQuery,
    mockUpdateTeamBoardCoachMutation
]

describe('Hand off coach', () => {
    describe('Success', () => {
        it('Should display success message', async () => {
            render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <RecoilRoot>
                        <MyTeamMemberListSection />
                        <MyTeamMemberDetailSection />
                        <ConfirmHandOffCoachModal />
                    </RecoilRoot>
                </MockedProvider>
            )
            await new Promise(resolve => setTimeout(resolve, 1000));
            expect(screen.queryAllByText('user2')[0]).toBeInTheDocument()
            userEvent.click(await screen.findByTestId('2-member-detail-as-md'))
            await new Promise(resolve => setTimeout(resolve, 1000));
            userEvent.click(await screen.findByTestId('confirm-hand-off-coach-button'))
            expect(await screen.findByTestId('hand-off-coach-user-name')).toHaveTextContent('user2')
            userEvent.click(screen.queryByTestId('hand-off-coach-button'))
            expect(await screen.findByText('コーチ権限を委譲しました。')).toBeInTheDocument()
        })
    })
})