import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getPage, initTestHelpers } from "next-page-tester";
import { setupServer } from 'msw/node'
import moment from "moment";

import { mainPageHandlers } from "../mocks/handlers";
import { TODAY } from "../../constants";

initTestHelpers()

const server = setupServer(...mainPageHandlers)

beforeAll(() => {
    server.listen()
})
beforeEach(() => {
    jest.setTimeout(50000)
})
afterEach(() => {
    server.resetHandlers()
    cleanup()
})
afterAll(() => {
    server.close()
})

describe('Display training detail', () => {
    it('Should display finished training detail after click finished member link', async () => {
        localStorage.setItem("token", 'test')
        const { page } = await getPage({
            route: '/main'
        })
        render(page)
        expect(await screen.findByText('トレーニングリスト')).toBeInTheDocument()
        userEvent.click(await screen.findByTestId('1-training-title'))
        expect(await screen.findByTestId('training-detail-title')).toHaveTextContent('トレーニング1')
        expect(await screen.findByTestId('training-detail-count')).toBeInTheDocument()
        expect(screen.queryByTestId('training-detail-load')).not.toBeInTheDocument()
        expect(screen.queryByTestId('training-detail-distance')).not.toBeInTheDocument()
        expect(screen.queryByTestId('training-detail-minitus')).not.toBeInTheDocument()
    })
})