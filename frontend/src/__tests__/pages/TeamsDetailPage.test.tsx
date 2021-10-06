import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from "@testing-library/react";
import { getPage, initTestHelpers } from "next-page-tester";
import { setupServer } from 'msw/node'

import { teamDetailPageHandler } from "../../mocks/handlers";

initTestHelpers()

const server = setupServer(...teamDetailPageHandler)

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

describe('Teams Detail Page', () => {
    it('Should render correct contents', async () => {
        localStorage.setItem("token", 'test')
        const { page } = await getPage({
            route: '/teams/1'
        })
        render(page)
        await new Promise(resolve => setTimeout(resolve, 5000));
        expect(await screen.findByText('team')).toBeInTheDocument()
        expect(await screen.findByText('team ページ')).toBeInTheDocument()
        expect(screen.queryByText('チーム一覧に戻る')).toBeInTheDocument()
        expect(screen.queryByText('今日のスケジュール')).toBeInTheDocument()
        expect(await screen.findByTestId('1-schedule-training')).toHaveTextContent('トレーニング1')
        expect(screen.queryByTestId('2-schedule-training')).toHaveTextContent('トレーニング2')
        expect(screen.queryByTestId('1-schedule-item').getElementsByTagName('img')[0]).toHaveAttribute('src', '/icon/white-barbell.png')
        expect(screen.queryByTestId('2-schedule-item').getElementsByTagName('img')[0]).toHaveAttribute('src', '/icon/white-barbell-squat.png')
        expect(await screen.findByTestId('1-training-title')).toHaveTextContent('トレーニング1')
        expect(screen.queryByTestId('1-training-icon').getElementsByTagName('img')[0]).toHaveAttribute('src', '/icon/white-barbell.png')
        expect(screen.queryByTestId('2-training-title')).toHaveTextContent('トレーニング2')
        expect(screen.queryByTestId('2-training-icon').getElementsByTagName('img')[0]).toHaveAttribute('src', '/icon/white-barbell-squat.png')
        expect(screen.queryByText("teamの掲示板")).toBeInTheDocument()
        expect(screen.queryByTestId('team-join-count')).toHaveTextContent('2人')
        expect(screen.queryByTestId('team-introduction')).toHaveTextContent('よろしくお願いします。')
    })
})