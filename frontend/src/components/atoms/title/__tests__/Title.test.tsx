import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'

import { HeadTitle } from '../HeadTitle'
import { PageTitle } from '../PageTitle'


afterEach(cleanup)

describe('HeadTitle', () => {
    it('Should render correct text', () => {
        render(
            <HeadTitle title='test' />
        )
        expect(screen.getByTitle('トレサポ | test')).toBeInTheDocument()
    })
})