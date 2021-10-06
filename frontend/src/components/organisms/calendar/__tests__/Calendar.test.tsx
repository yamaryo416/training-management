import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import userEvent from '@testing-library/user-event'

import { Calendar } from '../Calendar'
import { mockSchedules } from '../../../../mocks/mockScheduleData'

afterEach(cleanup)

describe('Calendar', () => {
    beforeEach(() => {
        render(
            <RecoilRoot>
                <Calendar
                    schedules={mockSchedules}
                />
            </RecoilRoot>
        )
    })

    it('Should correct content', () => {
        expect(screen.queryByText('予定を文字表記にする')).toBeInTheDocument()
        expect(screen.queryByText('予定をアイコン表記にする')).not.toBeInTheDocument()
        expect(screen.queryByTestId('1-schedule-item').getElementsByTagName('img')[0]).toHaveAttribute('src', '/icon/white-barbell.png')
        expect(screen.queryByText('トレーニング1')).not.toBeInTheDocument()
        expect(screen.queryByText('アイコンなしトレーニング2')).toBeInTheDocument()
        expect(screen.queryByTestId('3-schedule-item')).not.toBeInTheDocument()
    })

    it('Should display text after click change mode link', () => {
        userEvent.click(screen.getByText('予定を文字表記にする'))
        expect(screen.queryByRole('img')).not.toBeInTheDocument()
        expect(screen.queryByText('トレーニング1')).toBeInTheDocument()
        expect(screen.queryByText('予定を文字表記にする')).not.toBeInTheDocument()
        expect(screen.queryByText('予定をアイコン表記にする')).toBeInTheDocument()
    })
})