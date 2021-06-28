import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import userEvent from '@testing-library/user-event'

import { mockSchedules } from '../../../../mocks/mockScheduleData'
import { OneTeamCalendarDetail } from '../OneTeamCalendarDetail'
import moment from 'moment'

afterEach(cleanup)

describe('OneTeamCalendarDetail', () => {
    it('Should correct content', () => {
        render(
            <RecoilRoot>
                <OneTeamCalendarDetail  schedules={mockSchedules} />
            </RecoilRoot>
        )
        expect(screen.queryByText(`今日のスケジュール`)).toBeInTheDocument()
        expect(screen.queryByText('トレーニング1')).toBeInTheDocument()
        expect(screen.queryByText(`アイコンなしトレーニング2`)).toBeInTheDocument()
        expect(screen.queryAllByRole('img')[0]).toHaveAttribute('src', '/icon/white-barbell.png')
        expect(screen.queryAllByRole('img')[1]).toHaveAttribute('src', '/icon/no-icon.png')
    })

    it('Should previous date schedule after click previous icon', () => {
        render(
            <RecoilRoot>
                <OneTeamCalendarDetail  schedules={mockSchedules} />
            </RecoilRoot>
        )
        userEvent.click(screen.getByTestId('previous-date'))
        expect(screen.queryByText(`${moment().add(-1, "days").format('M/D')}のスケジュール`)).toBeInTheDocument()
        expect(screen.queryByText('トレーニング5')).toBeInTheDocument()
        expect(screen.queryByRole('img')).toHaveAttribute('src', '/icon/white-dumbell.png')
    })

    it('Should next date schedule after click next icon', () => {
        render(
            <RecoilRoot>
                <OneTeamCalendarDetail  schedules={mockSchedules} />
            </RecoilRoot>
        )
        userEvent.click(screen.getByTestId('next-date'))
        expect(screen.queryByText(`${moment().add(1, "days").format('M/D')}のスケジュール`)).toBeInTheDocument()
        expect(screen.queryByText('トレーニング6')).toBeInTheDocument()
        expect(screen.queryByRole('img')).toHaveAttribute('src', '/icon/white-plunk.png')
    })

    it('Should absent message', () => {
        render(
            <RecoilRoot>
                <OneTeamCalendarDetail  schedules={{ edges: [] }} />
            </RecoilRoot>
        )
        expect(screen.queryByText('予定はありません。')).toBeInTheDocument()
    })
})