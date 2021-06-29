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

describe('Display finished schedule member', () => {
    it('Should display finished schedule member after click finished member link', async () => {
        localStorage.setItem("token", 'test')
        const { page } = await getPage({
            route: '/main'
        })
        render(page)
        expect(await screen.findByText('今日のスケジュール')).toBeInTheDocument()
        userEvent.click(await screen.findByTestId('1-finished-member-link'))
        expect(await screen.findByText('スケジュール実施者リスト'))
        expect(await screen.findByTestId('selected-schedule-finished-title')).toHaveTextContent('トレーニング1')
        expect(await screen.findByTestId('selected-schedule-finished-date')).toHaveTextContent(moment(TODAY).format('YYYY年M月D日'))
        expect(screen.queryAllByTestId('finished-schedule-member-nickname').length).toBe(1)
        expect(screen.queryAllByTestId('finished-schedule-member-nickname')[0]).toHaveTextContent('coach user')
        expect(screen.queryAllByTestId('not-finished-schedule-member-nickname').length).toBe(2)
        expect(screen.queryAllByTestId('not-finished-schedule-member-nickname')[0]).toHaveTextContent('user2')
        expect(screen.queryAllByTestId('not-finished-schedule-member-nickname')[1]).toHaveTextContent('user3')
    })
})