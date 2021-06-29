import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import moment from 'moment';
import { mockMyProfileQuery } from '../mocks/mockProfileData';
import { MyTeamCalendarDetail } from '../components/organisms/calendar/MyTeamCalendarDetail'
import { mockTodaySchedulesQuery } from '../mocks/mockScheduleData';
import { mockDeleteFinishedScheduleMutation, mockMyFinishedSchedulesQuery, mockMyTeamFinishedSchedulesQuery } from '../mocks/mockFinishedSchedulesData';
import { mockMyTeamTrainingsQuery } from '../mocks/mockTrainingData';
import { ConfirmFinishedScheduleDeleteModal } from '../components/organisms/modal/ConfirmFinishedScheduleDeleteModal';

const mocks = [
    mockMyProfileQuery(true, false),
    mockTodaySchedulesQuery,
    mockDeleteFinishedScheduleMutation,
    mockMyTeamFinishedSchedulesQuery,
    mockMyFinishedSchedulesQuery,
    mockMyTeamTrainingsQuery,
    mockTodaySchedulesQuery
]

beforeEach(() => {
    jest.setTimeout(30000)
})

afterEach(cleanup)

describe('Finished Schedule Delete', () => {
    beforeEach(() => {
        render(
            <MockedProvider mocks={mocks}>
                <RecoilRoot>
                    <MyTeamCalendarDetail />
                    <ConfirmFinishedScheduleDeleteModal />
                </RecoilRoot>
            </MockedProvider>
        )
    })

    describe('Success', () => {
        it('Should display success message', async () => {
            expect(await screen.findByText('トレーニング1')).toBeInTheDocument
            userEvent.click(await screen.findByTestId('3-finished-text'))
            expect(await screen.findByTestId('finished-schedule-delete-title')).toHaveTextContent('トレーニング3')
            expect(screen.queryByTestId('finished-schedule-delete-date')).toHaveTextContent(moment().format('YYYY年M月D日'))
            await new Promise(resolve => setTimeout(resolve, 1000));
            userEvent.click(await screen.findByTestId('finished-schedule-delete-button'))
            await new Promise(resolve => setTimeout(resolve, 1000));
            expect(screen.queryAllByText('実施を取り消しました。')[0]).toBeInTheDocument()
        })
    })
})