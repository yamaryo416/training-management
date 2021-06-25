import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'

import { ErrorText } from '../ErrorText'
import { FailedText } from '../FailedText'


afterEach(cleanup)

describe('ErrorText', () => {
    it('Should render correct text', () => {
        render(
            <ErrorText>Error</ErrorText>
        )
        expect(screen.getByText('Error')).toBeInTheDocument()
    })
})

describe('FailedText', () => {
    it('Should render correct text', () => {
        render(
            <FailedText />
        )
        expect(screen.getByText('データの取得に失敗しました。')).toBeInTheDocument()
    })
})