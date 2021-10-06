import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import userEvent from '@testing-library/user-event'
import  { FinishedScheduleLogsItem } from '../FinishedScheduleLogsItem'
import moment from 'moment';

afterEach(cleanup)

describe('FinishedScheduleLogsitem', () => {
    it('Should correct content', () => {
        render(
            <RecoilRoot>
                <FinishedScheduleLogsItem
                    id='1'
                    title='トレーニング'
                    date={moment().format('YYYY-MM-DD')}
                    nickname='coach user'
                    count={0}
                    load={10}
                    distance={0}
                    minitus={10}
                    comment='nice'
                />
            </RecoilRoot>
        )
        expect(screen.queryByTestId('1-finished-schedule-nickname')).toHaveTextContent('coach user')
        expect(screen.queryByTestId('1-finished-schedule-date')).toHaveTextContent(moment().format('M月D日'))
        expect(screen.queryByTestId('1-finished-schedule-title')).toHaveTextContent('トレーニング')
        expect(screen.queryByTestId('1-finished-schedule-count')).not.toBeInTheDocument()
        expect(screen.queryByTestId('1-finished-schedule-load')).toHaveTextContent('10kg')
        expect(screen.queryByTestId('1-finished-schedule-distance')).not.toBeInTheDocument()
        expect(screen.queryByTestId('1-finished-schedule-minitus')).toHaveTextContent('10分')
        expect(screen.queryByTestId('1-finished-schedule-comment')).toHaveTextContent('コメント: nice')
    })
})