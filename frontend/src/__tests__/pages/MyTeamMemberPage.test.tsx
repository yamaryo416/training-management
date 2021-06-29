import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from "@testing-library/react";
import { getPage, initTestHelpers } from "next-page-tester";
import { setupServer } from 'msw/node'

import { myTeamMemberPageHandler } from "../../mocks/handlers";

initTestHelpers()

const server = setupServer(...myTeamMemberPageHandler)

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

describe('My Team Member Page', () => {
    it('Should render correct contents', async () => {
        localStorage.setItem("token", 'test')
        const { page } = await getPage({
            route: '/my-team-member'
        })
        render(page)
        await new Promise(resolve => setTimeout(resolve, 5000));
        expect(await screen.findByText('team')).toBeInTheDocument()
        expect(screen.queryByText('マイチームメンバー')).toBeInTheDocument()
        expect(screen.queryByText('メンバーリスト')).toBeInTheDocument()
        expect(await screen.findByTestId('1-member-nickname')).toHaveTextContent('coach user')
        expect(await screen.findByTestId('2-member-nickname')).toHaveTextContent('user2')
        expect(await screen.findByTestId('3-member-nickname')).toHaveTextContent('user3')
        expect(screen.queryByText('メンバー詳細')).toBeInTheDocument()
        expect(await screen.findByTestId('one-member-detail-nickname')).toHaveTextContent('coach user')
        expect(await screen.findByTestId('1-training-contents')).toHaveTextContent('トレーニング1')
        expect(await screen.findByTestId('1-finished-count')).toHaveTextContent('1回')
        expect(screen.queryByTestId('1-finished-implementation-list')).toBeInTheDocument()
        expect(await screen.findByTestId('11-training-contents')).toHaveTextContent('トレーニング11')
        expect(await screen.findByTestId('11-finished-count')).toHaveTextContent('0回')   
        expect(screen.queryByTestId('11-finished-implementation-list')).toBeInTheDocument() 
    })
})
