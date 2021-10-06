import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { mockMyProfileQuery } from '../mocks/mockProfileData';
import { MyTeamCalendarDetail } from '../components/organisms/calendar/MyTeamCalendarDetail'
import { mockTodaySchedulesQuery } from '../mocks/mockScheduleData';
import { FinishedScheduleCreateModal } from '../components/organisms/modal/FinishedScheduleCreateModal';
import { mockCreateFinishedScheduleMutation, mockErrorCreateFinishedScheduleMutation, mockMyFinishedSchedulesQuery, mockMyTeamFinishedSchedulesQuery } from '../mocks/mockFinishedSchedulesData';
import { mockMyTeamTrainingsQuery } from '../mocks/mockTrainingData';

const mocks = [
    mockMyProfileQuery(true, false),
    mockTodaySchedulesQuery,
    mockCreateFinishedScheduleMutation,
    mockMyTeamFinishedSchedulesQuery,
    mockMyFinishedSchedulesQuery,
    mockMyTeamTrainingsQuery,
    mockTodaySchedulesQuery
]

const mocksError = [
    mockMyProfileQuery(true, false),
    mockTodaySchedulesQuery,
    mockErrorCreateFinishedScheduleMutation,
    mockMyTeamFinishedSchedulesQuery,
    mockMyFinishedSchedulesQuery,
    mockMyTeamTrainingsQuery,
    mockTodaySchedulesQuery
]

beforeEach(() => {
    jest.setTimeout(30000)
})

afterEach(cleanup)

describe('Finished Schedule Create', () => {
    describe('Success', () => {
        it('Should display success message', async () => {
            render(
                <MockedProvider mocks={mocks}>
                    <RecoilRoot>
                        <FinishedScheduleCreateModal />
                        <MyTeamCalendarDetail />
                    </RecoilRoot>
                </MockedProvider>
            )
            expect(await screen.findByText('トレーニング1')).toBeInTheDocument
            userEvent.click(await screen.findByTestId('1-schedule-finished-create-button'))
            expect(await screen.findByTestId('modal-title')).toHaveTextContent('スケジュール実施')
            expect(screen.queryByTestId('finished-schedule-title')).toHaveTextContent('トレーニング1')
            fireEvent.change(screen.queryByTestId('count-form'),  { target: { value: '10' } })
            await new Promise(resolve => setTimeout(resolve, 1000));
            userEvent.click(await screen.findByTestId('schedule-finished-create-button'))
            await new Promise(resolve => setTimeout(resolve, 1000));
            expect(screen.queryAllByText('スケジュールを実施しました。')[0]).toBeInTheDocument()
        })
    })

    describe('False', () => {
        it('Should display error message because count is blank', async () => {
            render(
                <MockedProvider mocks={mocksError}>
                    <RecoilRoot>
                        <FinishedScheduleCreateModal />
                        <MyTeamCalendarDetail />
                    </RecoilRoot>
                </MockedProvider>
            )
            expect(await screen.findByText('トレーニング1')).toBeInTheDocument
            userEvent.click(await screen.findByTestId('1-schedule-finished-create-button'))
            expect(await screen.findByTestId('modal-title')).toHaveTextContent('スケジュール実施')
            expect(screen.queryByTestId('finished-schedule-title')).toHaveTextContent('トレーニング1')
            await new Promise(resolve => setTimeout(resolve, 1000));
            userEvent.click(await screen.findByTestId('schedule-finished-create-button'))
            await new Promise(resolve => setTimeout(resolve, 1000));
            expect(screen.queryAllByText('回数を入力してください。')[0]).toBeInTheDocument()
        })
    })
})