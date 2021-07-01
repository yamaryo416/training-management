import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from "@testing-library/react";
import { getPage, initTestHelpers } from "next-page-tester";
import moment from "moment";
import { setupServer } from 'msw/node'

import { mainPageHandlers } from "../../mocks/handlers";

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

describe('Main page', () => {
    it('Should render correct contents', async () => {
        localStorage.setItem("token", 'test')
        const { page } = await getPage({
            route: '/main'
        })
        render(page)
        await new Promise(resolve => setTimeout(resolve, 5000));
        expect(await screen.findByTestId('my-team-name')).toHaveTextContent('team')
        expect(screen.queryByTestId('my-nickname')).toHaveTextContent('coach user')
        expect(await screen.findByTestId('page-title')).toHaveTextContent('マイページ')
        expect(await screen.findByText("今日のスケジュール")).toBeInTheDocument()
        expect(await screen.findByTestId('1-schedule-training')).toHaveTextContent('トレーニング1')
        expect(screen.queryByTestId('1-schedule-finished-create-button')).toBeInTheDocument()
        expect(screen.queryByTestId('1-finished-count')).toHaveTextContent('0/2人実施')
        expect(screen.queryByTestId('1-finished-member-link')).toBeInTheDocument()
        expect(screen.queryByTestId('2-schedule-training')).toHaveTextContent('アイコンなしトレーニング2')
        expect(screen.queryByTestId('2-schedule-finished-create-button')).toBeInTheDocument()
        expect(screen.queryByTestId('2-finished-count')).toHaveTextContent('0/2人実施')
        expect(screen.queryByTestId('2-finished-member-link')).toBeInTheDocument()
        expect(screen.queryByTestId('1-schedule-item').getElementsByTagName('img')[0]).toHaveAttribute('src', '/icon/white-barbell.png')
        expect(screen.queryByTestId('2-schedule-item').getElementsByTagName('p')[0]).toHaveTextContent('アイコンなしトレーニング2')
        expect(screen.queryByText("トレーニングリスト")).toBeInTheDocument()
        expect(screen.queryByTestId('1-training-icon').getElementsByTagName('img')[0]).toHaveAttribute('src', '/icon/white-barbell.png')
        expect(screen.queryByTestId('1-training-title')).toHaveTextContent('トレーニング1')
        expect(screen.queryByTestId('1-training-edit-icon')).toBeInTheDocument()
        expect(screen.queryByTestId('1-training-delete-icon')).toBeInTheDocument()
        expect(screen.queryByTestId('10-training-icon').getElementsByTagName('img')[0]).toHaveAttribute('src', '/icon/white-swim.png')
        expect(screen.queryByTestId('10-training-title')).toHaveTextContent('トレーニング10')
        expect(screen.queryByTestId('11-training-title')).not.toBeInTheDocument()
        expect(screen.queryByTestId('training-fetch-more-button')).toBeInTheDocument()
        expect(screen.queryByText('スケジュール実施記録')).toBeInTheDocument()
        expect(screen.queryByTestId('change-my-finished-schedule-logs-link')).toBeInTheDocument()
        expect(screen.queryByTestId('change-my-team-finished-schedule-logs-link')).toBeInTheDocument()
        expect(screen.queryByTestId('1-finished-schedule-nickname')).toHaveTextContent('coach user')
        expect(screen.queryByTestId('1-finished-schedule-date')).toHaveTextContent(moment().format('M月D日'))
        expect(screen.queryByTestId('1-finished-schedule-title')).toHaveTextContent(moment().format('トレーニング1'))
        expect(screen.queryByTestId('1-finished-schedule-count')).toHaveTextContent(moment().format('10回'))
        expect(screen.queryByText("teamの掲示板")).toBeInTheDocument()
        expect(screen.queryByTestId('team-coach-name')).toHaveTextContent('coach user')
        expect(screen.queryByTestId('team-join-count')).toHaveTextContent('2人')
        expect(screen.queryByTestId('team-introduction')).toHaveTextContent('記載はありません。')
        expect(screen.queryByText("投稿一覧")).toBeInTheDocument()
        expect(screen.queryAllByTestId('my-post').length).toEqual(5)
        expect(screen.queryByText('post1')).toBeInTheDocument()
        expect(screen.queryByTestId('1-post-created-at')).toHaveTextContent('1月2日(土) 1時23分')
        expect(screen.queryAllByTestId('other-post').length).toEqual(5)
        expect(screen.queryByText('post10')).toBeInTheDocument()
        expect(screen.queryByTestId('10-post-created-at')).toHaveTextContent('1月11日(月) 1時23分')
        expect(screen.queryByText('post11')).not.toBeInTheDocument()
        expect(screen.queryByTestId('post-fetch-more-button')).toBeInTheDocument()
    })
})
