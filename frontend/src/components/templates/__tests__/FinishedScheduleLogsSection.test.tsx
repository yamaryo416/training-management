import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 

import { FinishedScheduleLogsSection } from '../FinishedScheduleLogsSection';
import { mockMyFinishedSchedulesQuery, mockMyTeamFinishedSchedulesQuery } from '../../../mocks/mockFinishedSchedulesData';
import moment from 'moment';
import userEvent from '@testing-library/user-event';

afterEach(cleanup)

const mocks = [
    mockMyFinishedSchedulesQuery,
    mockMyTeamFinishedSchedulesQuery,
]

describe('FinishedScheduleLogsSection', () => {
    it('Should render correct contents', async () => {
        render(
            <MockedProvider mocks={mocks}>
                <RecoilRoot>
                    <FinishedScheduleLogsSection />
                </RecoilRoot>        
            </MockedProvider>
        )
        expect(await screen.findByText('スケジュール実施記録')).toBeInTheDocument()
        expect(screen.queryByTestId('change-my-finished-schedule-logs-link')).toBeInTheDocument()
        expect(screen.queryByTestId('change-my-team-finished-schedule-logs-link')).toBeInTheDocument()
        expect(screen.queryByTestId('1-finished-schedule-nickname')).toHaveTextContent('coach user')
        expect(screen.queryByTestId('1-finished-schedule-date')).toHaveTextContent(moment().format('M月D日'))
        expect(screen.queryByTestId('1-finished-schedule-title')).toHaveTextContent('トレーニング1')
        expect(screen.queryByTestId('1-finished-schedule-count')).toHaveTextContent('10回')
        expect(screen.queryByTestId('3-finished-schedule-nickname')).toHaveTextContent('coach user')
        expect(screen.queryByTestId('3-finished-schedule-date')).toHaveTextContent(moment().add(-2, 'days').format('M月D日'))
        expect(screen.queryByTestId('3-finished-schedule-title')).toHaveTextContent('トレーニング1')
        expect(screen.queryByTestId('3-finished-schedule-count')).toHaveTextContent('10回')
        expect(screen.queryByTestId('4-finished-schedule-nickname')).not.toBeInTheDocument()
    })

    it('Should display my team finished schedule logs after change my team finished logs', async () => {
        render(
            <MockedProvider mocks={mocks}>
                <RecoilRoot>
                    <FinishedScheduleLogsSection />
                </RecoilRoot>        
            </MockedProvider>
        )
        expect(await screen.findByText('スケジュール実施記録')).toBeInTheDocument()
        userEvent.click(screen.queryByTestId('change-my-team-finished-schedule-logs-link'))
        expect(await screen.findByTestId('4-finished-schedule-nickname')).toHaveTextContent('user1')
        expect(screen.queryByTestId('4-finished-schedule-date')).toHaveTextContent(moment().format('M月D日'))
        expect(screen.queryByTestId('4-finished-schedule-title')).toHaveTextContent('トレーニング1')
        expect(screen.queryByTestId('4-finished-schedule-count')).toHaveTextContent('10回')
        expect(screen.queryByTestId('6-finished-schedule-nickname')).toHaveTextContent('user1')
        expect(screen.queryByTestId('6-finished-schedule-date')).toHaveTextContent(moment().add(-2, 'days').format('M月D日'))
        expect(screen.queryByTestId('6-finished-schedule-title')).toHaveTextContent('トレーニング1')
        expect(screen.queryByTestId('6-finished-schedule-count')).toHaveTextContent('10回')
    })
})