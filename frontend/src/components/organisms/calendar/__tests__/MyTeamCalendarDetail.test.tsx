import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { MyTeamCalendarDetail } from '../MyTeamCalendarDetail';
import { mockMyProfileQuery } from '../../../../mocks/mockProfileData';
import { MockAbsentShcduleQuery, mockErrorScheduleQuery, mockNextSchedulesQuery, mockPreviousSchedulesQuery, mockTodaySchedulesQuery } from '../../../../mocks/mockScheduleData';

const mocksCoach = [
    mockMyProfileQuery(true, false),
    mockTodaySchedulesQuery,
    mockPreviousSchedulesQuery,
    mockNextSchedulesQuery
]

const mocksGeneral = [
    mockMyProfileQuery(false, false),
    mockTodaySchedulesQuery
]

const mocksGuest = [
    mockMyProfileQuery(false, true),
    mockTodaySchedulesQuery
]

const mocksErrorScheduleData = [
    mockMyProfileQuery(true, false),
    mockErrorScheduleQuery
]

const mocksAbsentScheduleData = [
    mockMyProfileQuery(true, false),
    MockAbsentShcduleQuery
]

afterEach(cleanup)

describe('MyTeamCalendarDetail', () => {
    it('Should render without error', () => {
        render(
            <MockedProvider mocks={mocksCoach} addTypename={false}>
                <RecoilRoot>
                    <MyTeamCalendarDetail />
                </RecoilRoot>
            </MockedProvider>
        )
        expect(screen.queryByText('Loading...')).toBeInTheDocument()
    })

    it('Should render error message', async () => {
        render(
            <MockedProvider mocks={mocksErrorScheduleData} addTypename={false}>
                <RecoilRoot>
                    <MyTeamCalendarDetail />
                </RecoilRoot>
            </MockedProvider>
        )
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(screen.queryByText('データの取得に失敗しました。')).toBeInTheDocument()
    })

    it('Should render correct contents', async () => {
        render(
            <MockedProvider mocks={mocksGeneral} addTypename={false}>
                <RecoilRoot>
                    <MyTeamCalendarDetail />
                </RecoilRoot>
            </MockedProvider>
        )
        expect(await screen.findByText(`今日のスケジュール`)).toBeInTheDocument()
        expect(await screen.findByText('トレーニング1')).toBeInTheDocument()
        expect(screen.queryAllByRole('img')[0]).toHaveAttribute('src', '/icon/white-barbell.png')
        expect(screen.queryByText('アイコンなしトレーニング2')).toBeInTheDocument()
        expect(screen.queryAllByRole('img')[1]).toHaveAttribute('src', '/icon/no-icon.png')
        expect(screen.queryByText('トレーニング3')).toBeInTheDocument()
        expect(screen.queryAllByRole('img')[2]).toHaveAttribute('src', '/icon/white-running.png')
    })

    it('Should render absent message', async () => {
        render(
            <MockedProvider mocks={mocksAbsentScheduleData} addTypename={false}>
                <RecoilRoot>
                    <MyTeamCalendarDetail />
                </RecoilRoot>
            </MockedProvider>
        )
        await new Promise(resolve => setTimeout(resolve, 0));
        expect(screen.queryByText('予定はありません。')).toBeInTheDocument()
    })

    describe('As Coach', () => {
        beforeEach(() => {
            render(
                <MockedProvider mocks={mocksCoach} >
                    <RecoilRoot>
                        <MyTeamCalendarDetail />
                    </RecoilRoot>
                </MockedProvider>
            )
        })

        it('Should render correct today schedules', async () => {
            expect(await screen.findByTestId('1-schedule-training')).toBeInTheDocument()
            expect(screen.queryByTestId('1-schedule-finished-create-button')).toBeInTheDocument()
            expect(screen.queryByTestId('1-finished-text')).not.toBeInTheDocument()
            expect(screen.queryByTestId('2-schedule-finished-create-button')).toBeInTheDocument()
            expect(screen.queryByTestId('2-finished-text')).not.toBeInTheDocument()
            expect(screen.queryByTestId('3-schedule-finished-create-button')).not.toBeInTheDocument()
            expect(screen.queryByTestId('3-finished-text')).toBeInTheDocument()
            expect(screen.queryByTestId('1-schedule-delete-icon')).toBeInTheDocument()
            expect(screen.queryByTestId('1-finished-count')).toHaveTextContent('0/1人実施')
            expect(screen.queryByTestId('3-finished-count')).toHaveTextContent('1/1人実施')
            expect(screen.queryByTestId('1-finished-member-link')).toBeInTheDocument()
        })

        it('Should render correct previous date schedules', async () => {
            userEvent.click(await screen.findByTestId('previous-date'))
            expect(await screen.findByTestId('4-schedule-training')).toBeInTheDocument()
            expect(screen.queryByTestId('1-schedule-training')).not.toBeInTheDocument()
            expect(screen.queryByTestId('4-schedule-finished-create-buttonn')).not.toBeInTheDocument()
            expect(screen.queryByTestId('4-finished-text')).not.toBeInTheDocument()
            expect(screen.queryByTestId('4-previous-finished-text')).toBeInTheDocument()
            expect(screen.queryByTestId('5-previous-finished-text')).not.toBeInTheDocument()
            expect(screen.queryByTestId('5-previous-not-finished-text')).toBeInTheDocument()
        })

        it('Should render correct next date schedules', async () => {
            userEvent.click(await screen.findByTestId('next-date'))
            expect(await screen.findByTestId('6-schedule-training')).toBeInTheDocument()
            expect(screen.queryByTestId('1-schedule-training')).not.toBeInTheDocument()
            expect(screen.queryByTestId('6-schedule-finished-create-buttonn')).not.toBeInTheDocument()
            expect(screen.queryByTestId('6-finished-text')).not.toBeInTheDocument()
        })
    })

    describe('As General', () => {
        it('Should render correct contents', async () => {
            render(
                <MockedProvider mocks={mocksGeneral}>
                    <RecoilRoot>
                        <MyTeamCalendarDetail />
                    </RecoilRoot>
                </MockedProvider>
            )
            expect(await screen.findByTestId('1-schedule-training')).toBeInTheDocument()
            expect(screen.queryByTestId('1-schedule-finished-create-button')).toBeInTheDocument()
            expect(screen.queryByTestId('1-finished-text')).not.toBeInTheDocument()
            expect(screen.queryByTestId('1-schedule-delete-icon')).not.toBeInTheDocument()
            expect(screen.queryByTestId('1-finished-count')).not.toBeInTheDocument()
            expect(screen.queryByTestId('1-finished-member-link')).not.toBeInTheDocument()
        })
    })

    describe('As Guest', () => {
        it('Should render correct contents', async () => {
            render(
                <MockedProvider mocks={mocksGuest}>
                    <RecoilRoot>
                        <MyTeamCalendarDetail />
                    </RecoilRoot>
                </MockedProvider>
            )
            expect(await screen.findByTestId('1-schedule-training')).toBeInTheDocument()
            expect(screen.queryByTestId('1-schedule-finished-create-button')).not.toBeInTheDocument()
            expect(screen.queryByTestId('1-finished-text')).not.toBeInTheDocument()
            expect(screen.queryByTestId('1-schedule-delete-icon')).not.toBeInTheDocument()
            expect(screen.queryByTestId('1-finished-count')).not.toBeInTheDocument()
            expect(screen.queryByTestId('1-finished-member-link')).not.toBeInTheDocument()
        })
    })
})