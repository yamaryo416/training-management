import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'

import { PageTitle } from '../PageTitle'
import { SectionTitle } from '../SectionTitle'


afterEach(cleanup)

describe('PageTitle', () => {
    it('Should render correct text', () => {
        render(
            <PageTitle>Test</PageTitle>
        )
        expect(screen.queryByText('Test')).toBeInTheDocument()
    })
})

describe('SectionTitle', () => {
    it('Should render correct text', () => {
        render(
            <SectionTitle>Test</SectionTitle>
        )
        expect(screen.queryByText('Test')).toBeInTheDocument()
    })
})