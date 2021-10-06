import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'

import { mockSchedule } from '../../../../mocks/mockScheduleData';
import { CalendarDetailContents } from '../CalendarDetailContents';

afterEach(cleanup)

describe('CalendarDetailContents', () => {
    it('Should correct content', () => {
        render(
            <CalendarDetailContents 
                node={mockSchedule('1', 0)}
            />
        )
        expect(screen.queryByText('トレーニング1')).toBeInTheDocument()
        expect(screen.queryByRole('img')).toHaveAttribute('src', '/icon/white-barbell.png')
    })
})