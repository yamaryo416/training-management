import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { MyTeamCalendarDetail } from '../../calendar/MyTeamCalendarDetail';
import { mockMyProfileQuery } from '../../../../mocks/mockProfileData';
import { mockTodaySchedulesQuery } from '../../../../mocks/mockScheduleData';
import { FinishedScheduleCreateModal } from '../FinishedScheduleCreateModal'

const mocks = [
    mockMyProfileQuery(true, false),
    mockTodaySchedulesQuery,
]

afterEach(cleanup)

describe('FinishedScheduleCreateModal', () => {
    beforeEach(() => {
        render(
            <MockedProvider mocks={mocks}>
                <RecoilRoot>
                    <MyTeamCalendarDetail />
                    <FinishedScheduleCreateModal />
                </RecoilRoot>
            </MockedProvider>
        )
    })

    it('Should render correct contents', async () => {
        expect(await screen.findByText('トレーニング1')).toBeInTheDocument
        userEvent.click(await screen.findByTestId('1-schedule-finished-create-button'))
        expect(await screen.findByText('スケジュール実施')).toBeInTheDocument()
        expect(screen.queryByTestId('finished-schedule-title')).toHaveTextContent('トレーニング1')
        expect(screen.queryByTestId('count-form')).toBeInTheDocument()
        expect(screen.queryByTestId('load-form')).not.toBeInTheDocument()
        expect(screen.queryByTestId('distance-form')).not.toBeInTheDocument()
        expect(screen.queryByTestId('minitus-form')).not.toBeInTheDocument()
        expect(screen.queryByTestId('comment-form')).toBeInTheDocument()
        expect(screen.queryByTestId('schedule-finished-create-button')).toBeInTheDocument()
    })
})