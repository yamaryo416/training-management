import '@testing-library/jest-dom/extend-expect'

import moment from "moment";
import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { mockMyProfileQuery } from '../../../../mocks/mockProfileData';
import { mockFirstMyTeamPostsQuery, mockSecondMyTeamPostsQuery, mockErrorMyTeamPostsQuery, mockAbsentMyTeamPostsQuery } from '../../../../mocks/mockPostData';
import { TeamBoardPost } from '../TeamBoardPost';

const mocksCoach = [
    mockMyProfileQuery(true, false),
    mockFirstMyTeamPostsQuery,
    mockSecondMyTeamPostsQuery,
    mockFirstMyTeamPostsQuery
]

const mocksGeneral = [
    mockMyProfileQuery(false, false),
    mockFirstMyTeamPostsQuery
]

const mocksGuest = [
    mockMyProfileQuery(false, true),
    mockFirstMyTeamPostsQuery
]

const mocksErrorPostData = [
    mockMyProfileQuery(true, false),
    mockErrorMyTeamPostsQuery
]

const mocksAbsentPostData = [
    mockMyProfileQuery(true, false),
    mockAbsentMyTeamPostsQuery
]

beforeEach(() => {
    jest.setTimeout(30000)
})

afterEach(cleanup)

describe('TeamBoardPostItem', () => {
    it('Should render without error', () => {
        render(
            <MockedProvider mocks={mocksCoach} addTypename={false}>
                <RecoilRoot>
                    <TeamBoardPost />
                </RecoilRoot>
            </MockedProvider>
        )
        expect(screen.queryByText('Loading...')).toBeInTheDocument()
    })

    it('Should render error message', async () => {
        render(
            <MockedProvider mocks={mocksErrorPostData} addTypename={false}>
                <RecoilRoot>
                    <TeamBoardPost />
                </RecoilRoot>
            </MockedProvider>
        )
        expect(await screen.findByText('データの取得に失敗しました。')).toBeInTheDocument()
    })

    it('Should render correct contents', async () => {
        render(
            <MockedProvider mocks={mocksCoach} addTypename={false}>
                <RecoilRoot>
                    <TeamBoardPost />
                </RecoilRoot>
            </MockedProvider>
        )
        expect(await screen.findByText("投稿一覧")).toBeInTheDocument()
        expect(screen.queryAllByTestId('my-post').length).toEqual(5)
        expect(screen.queryByText('post1')).toBeInTheDocument()
        expect(screen.queryByTestId('1-post-created-at')).toHaveTextContent('1月2日 1時23分')
        expect(screen.queryAllByTestId('other-post').length).toEqual(5)
        expect(screen.queryByText('post6')).toBeInTheDocument()
        expect(screen.queryByTestId('6-post-created-at')).toHaveTextContent('1月7日 1時23分')
        expect(screen.queryByText("以前の10件の投稿")).toBeInTheDocument()
        expect(screen.queryByText("閉じる")).not.toBeInTheDocument()
    })

    it('Should fetch more post after fetch link', async　() => {
        render(
            <MockedProvider mocks={mocksCoach} addTypename={false}>
                <RecoilRoot>
                    <TeamBoardPost />
                </RecoilRoot>
            </MockedProvider>
        )
        userEvent.click(await screen.findByText('以前の10件の投稿'))
        expect(await screen.findByText('post11')).toBeInTheDocument()
        expect(screen.queryAllByTestId('my-post').length).toEqual(7)
        expect(screen.queryByText("閉じる")).toBeInTheDocument()
        expect(screen.queryByText("以前の10件の投稿")).not.toBeInTheDocument()
    })

    it('Should render absent message', async () => {
        render(
            <MockedProvider mocks={mocksAbsentPostData} addTypename={false}>
                <RecoilRoot>
                    <TeamBoardPost />
                </RecoilRoot>
            </MockedProvider>
        )
        expect(await screen.findByText('投稿はありません。')).toBeInTheDocument()
    })

    describe('As Coach', () => {
        it('Should render correct contents', async () => {
            render(
                <MockedProvider mocks={mocksCoach} addTypename={false}>
                    <RecoilRoot>
                        <TeamBoardPost />
                    </RecoilRoot>
                </MockedProvider>
            )
            expect(await screen.findByTestId('create-post-button')).toHaveTextContent('投稿')
            expect(await screen.findByTestId('1-post-delete-icon')).toBeInTheDocument()
            expect(screen.queryByTestId('6-post-delete-icon')).toBeInTheDocument()
        })
    })

    describe('As General', () => {
        it('Should render correct contents', async() => {
            render(
                <MockedProvider mocks={mocksGeneral} addTypename={false}>
                    <RecoilRoot>
                        <TeamBoardPost />
                    </RecoilRoot>
                </MockedProvider>
            )
            expect(await screen.findByTestId('create-post-button')).toHaveTextContent('投稿')
            expect(await screen.findByTestId('1-post-delete-icon')).toBeInTheDocument()
            expect(screen.queryByTestId('6-post-delete-icon')).not.toBeInTheDocument()
        })
    })

    describe('As Guest', () => {
        it('Should render correct contents', async() => {
            render(
                <MockedProvider mocks={mocksGuest} addTypename={false}>
                    <RecoilRoot>
                        <TeamBoardPost />
                    </RecoilRoot>
                </MockedProvider>
            )
            await new Promise(resolve => setTimeout(resolve, 1000));
            expect(screen.queryByTestId('create-post-button')).not.toBeInTheDocument()
        })
    })
})