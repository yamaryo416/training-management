import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing' 

import { TrainingFinishedItem } from '../TrainingFinishedItem';
import moment from 'moment';

afterEach(cleanup)

describe('TrainingFinishedItem', () => {
    it('Should render correct contents', () => {
        render(
            <MockedProvider >
                <TrainingFinishedItem date={moment().format('YYYY-MM-DD')} finishedPatern='1' count={10} load={0} distance={0} minitus={0} />
            </MockedProvider>
        )
        expect(screen.queryByTestId('training-finished-item-date')).toHaveTextContent(moment().format('YYYY年M月D日'))
        expect(screen.queryByText('10回'))
    })

})