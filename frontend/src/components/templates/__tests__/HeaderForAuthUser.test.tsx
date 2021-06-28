import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { HeaderForAuthUser } from '../HeaderForAuthUser';
import { mockTeamBoard } from '../../../mocks/mockTeamBoardData';
import { RecoilRoot } from 'recoil';

afterEach(cleanup)

describe('HeaderForAuthUser', () => {
    describe('My team page', () => {
        describe('As Coach', () => {
            it('Should render correct contents', () => {
                render(
                    <MockedProvider >
                        <RecoilRoot>
                            <HeaderForAuthUser
                                title='test'
                                nickname="user"
                                myTeamBoard={mockTeamBoard}
                                isMyTeamPage={true}
                                isCoach={true}
                                isGuest={false}
                            />
                        </RecoilRoot>
                    </MockedProvider>
                )
                expect(screen.getByTestId('page-title')).toHaveTextContent('test')
                expect(screen.getByTestId('my-team-name')).toHaveTextContent('team')
                expect(screen.getByTestId('my-nickname')).toHaveTextContent('user')
                expect(screen.queryByText('メニュー')).toBeInTheDocument()
                expect(screen.queryByText('ページ移動')).toBeInTheDocument()
            })
    
            it('Should display my menu after click my menu', () => {
                render(
                    <MockedProvider >
                        <RecoilRoot>
                           <HeaderForAuthUser
                                title='test'
                                nickname="user"
                                myTeamBoard={mockTeamBoard}
                                isMyTeamPage={true}
                                isCoach={true}
                                isGuest={false}
                            />
                        </RecoilRoot>
                    </MockedProvider>
                )
                userEvent.click(screen.getByText('メニュー'))
                expect(screen.queryByText('プロフィール編集')).toBeInTheDocument()
                expect(screen.queryByText('チーム編集')).toBeInTheDocument()
                expect(screen.queryByText('トレーニング作成')).toBeInTheDocument()
                expect(screen.queryByText('スケジュール作成')).toBeInTheDocument()
                expect(screen.queryByText('スケジュール削除')).toBeInTheDocument()
                expect(screen.queryByText('ログアウト')).toBeInTheDocument()
                expect(screen.queryByText('チーム加入')).not.toBeInTheDocument()
                expect(screen.queryByText('チーム作成')).not.toBeInTheDocument()
                expect(screen.queryByText('アカウント削除')).not.toBeInTheDocument()
            })
    
            it('Should display move page list after click move page', () => {
                render(
                    <MockedProvider >
                        <RecoilRoot>
                            <HeaderForAuthUser
                                title='test'
                                nickname="user"
                                myTeamBoard={mockTeamBoard}
                                isMyTeamPage={true}
                                isCoach={true}
                                isGuest={false}
                            />
                        </RecoilRoot>
                    </MockedProvider>
                )
                userEvent.click(screen.getByText('ページ移動'))
                expect(screen.queryByText('マイページ')).toBeInTheDocument()
                expect(screen.queryByText('マイチームメンバー')).toBeInTheDocument()
                expect(screen.queryByText('チームリスト')).toBeInTheDocument()
            })
        })
    })

    describe('As General', () => {
        it('Should display my menu after click my menu', () => {
            render(
                <MockedProvider >
                    <RecoilRoot>
                        <HeaderForAuthUser
                            title='test'
                            nickname="user"
                            myTeamBoard={mockTeamBoard}
                            isMyTeamPage={true}
                            isCoach={false}
                            isGuest={false}
                        />
                    </RecoilRoot>
                </MockedProvider>
            )
            userEvent.click(screen.getByText('メニュー'))
            expect(screen.queryByText('プロフィール編集')).toBeInTheDocument()
            expect(screen.queryByText('チーム編集')).not.toBeInTheDocument()
            expect(screen.queryByText('トレーニング作成')).not.toBeInTheDocument()
            expect(screen.queryByText('スケジュール作成')).not.toBeInTheDocument()
            expect(screen.queryByText('スケジュール削除')).not.toBeInTheDocument()
            expect(screen.queryByText('ログアウト')).toBeInTheDocument()
            expect(screen.queryByText('チーム加入')).not.toBeInTheDocument()
            expect(screen.queryByText('チーム作成')).not.toBeInTheDocument()
            expect(screen.queryByText('アカウント削除')).not.toBeInTheDocument()
        })

        it('Should display move page list after click move page', () => {
            render(
                <MockedProvider >
                    <RecoilRoot>
                        <HeaderForAuthUser
                            title='test'
                            nickname="user"
                            myTeamBoard={mockTeamBoard}
                            isMyTeamPage={true}
                            isCoach={false}
                            isGuest={false}
                        />
                    </RecoilRoot>
                </MockedProvider>
            )
            userEvent.click(screen.getByText('ページ移動'))
            expect(screen.queryByText('マイページ')).toBeInTheDocument()
            expect(screen.queryByText('マイチームメンバー')).not.toBeInTheDocument()
            expect(screen.queryByText('チームリスト')).toBeInTheDocument()
        })
    })

    describe('As Guest', () => {
        it('Should display my menu after click my menu', () => {
            render(
                <MockedProvider >
                    <RecoilRoot>
                        <HeaderForAuthUser
                            title='test'
                            nickname="user"
                            myTeamBoard={mockTeamBoard}
                            isMyTeamPage={true}
                            isCoach={false}
                            isGuest={true}
                        />
                    </RecoilRoot>
                </MockedProvider>
            )
            userEvent.click(screen.getByText('メニュー'))
            expect(screen.queryByText('プロフィール編集')).not.toBeInTheDocument()
            expect(screen.queryByText('チーム編集')).not.toBeInTheDocument()
            expect(screen.queryByText('トレーニング作成')).not.toBeInTheDocument()
            expect(screen.queryByText('スケジュール作成')).not.toBeInTheDocument()
            expect(screen.queryByText('スケジュール削除')).not.toBeInTheDocument()
            expect(screen.queryByText('ログアウト')).not.toBeInTheDocument()
            expect(screen.queryByText('チーム加入')).not.toBeInTheDocument()
            expect(screen.queryByText('チーム作成')).not.toBeInTheDocument()
            expect(screen.queryByText('アカウント削除')).toBeInTheDocument()
        })

        it('Should display move page list after click move page', () => {
            render(
                <MockedProvider >
                    <RecoilRoot>
                        <HeaderForAuthUser
                            title='test'
                            nickname="user"
                            myTeamBoard={mockTeamBoard}
                            isMyTeamPage={true}
                            isCoach={false}
                            isGuest={true}
                        />
                    </RecoilRoot>
                </MockedProvider>
            )
            userEvent.click(screen.getByText('ページ移動'))
            expect(screen.queryByText('マイページ')).toBeInTheDocument()
            expect(screen.queryByText('マイチームメンバー')).not.toBeInTheDocument()
            expect(screen.queryByText('チームリスト')).toBeInTheDocument()
        })
    })

    describe('Other Page', () => {
        describe('As Coach', () => {
            it('Should display my menu after click my menu', () => {
                render(
                    <MockedProvider >
                        <RecoilRoot>
                            <HeaderForAuthUser
                                title='test'
                                nickname="user"
                                myTeamBoard={mockTeamBoard}
                                isMyTeamPage={false}
                                isCoach={true}
                                isGuest={false}
                            />
                        </RecoilRoot>
                    </MockedProvider>
                )
                userEvent.click(screen.getByText('メニュー'))
                expect(screen.queryByText('プロフィール編集')).toBeInTheDocument()
                expect(screen.queryByText('チーム編集')).not.toBeInTheDocument()
                expect(screen.queryByText('トレーニング作成')).not.toBeInTheDocument()
                expect(screen.queryByText('スケジュール作成')).not.toBeInTheDocument()
                expect(screen.queryByText('スケジュール削除')).not.toBeInTheDocument()
                expect(screen.queryByText('ログアウト')).toBeInTheDocument()
                expect(screen.queryByText('チーム加入')).not.toBeInTheDocument()
                expect(screen.queryByText('チーム作成')).not.toBeInTheDocument()
                expect(screen.queryByText('アカウント削除')).not.toBeInTheDocument()
            })
        })

        describe('As not join team', () => {
            it('Should render correct contents', () => {
                render(
                    <MockedProvider >
                        <RecoilRoot>
                            <HeaderForAuthUser
                                title='test'
                                nickname="user"
                                myTeamBoard={null}
                                isMyTeamPage={false}
                                isCoach={true}
                                isGuest={false}
                            />
                        </RecoilRoot>
                    </MockedProvider>
                )
                expect(screen.getByTestId('my-team-name')).toHaveTextContent('未所属')
            })

            it('Should display my menu after click my menu', () => {
                render(
                    <MockedProvider >
                        <RecoilRoot>
                            <HeaderForAuthUser
                                title='test'
                                nickname="user"
                                myTeamBoard={null}
                                isMyTeamPage={false}
                                isCoach={false}
                                isGuest={false}
                            />
                        </RecoilRoot>
                    </MockedProvider>
                )
                userEvent.click(screen.getByText('メニュー'))
                expect(screen.queryByText('プロフィール編集')).toBeInTheDocument()
                expect(screen.queryByText('チーム編集')).not.toBeInTheDocument()
                expect(screen.queryByText('トレーニング作成')).not.toBeInTheDocument()
                expect(screen.queryByText('スケジュール作成')).not.toBeInTheDocument()
                expect(screen.queryByText('スケジュール削除')).not.toBeInTheDocument()
                expect(screen.queryByText('ログアウト')).toBeInTheDocument()
                expect(screen.queryByText('チーム加入')).toBeInTheDocument()
                expect(screen.queryByText('チーム作成')).toBeInTheDocument()
                expect(screen.queryByText('アカウント削除')).not.toBeInTheDocument()
            })
        })
    })
})