import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { MainMenubar } from '../MainMenubar';
import { RecoilRoot } from 'recoil';

afterEach(cleanup)

describe('MainMenubar', () => {
    describe('My page', () => {
        describe('As Coach', () => {
            it('Should render correct contents', () => {
                render(
                    <MockedProvider>
                        <RecoilRoot>
                            <MainMenubar
                                isJoinTeam={true}
                                isCoach={true}
                                isMyTeamPage={true}
                                isGuest={false}
                            />
                        </RecoilRoot>
                    </MockedProvider>
                )
                expect(screen.queryByText('メニュー')).toBeInTheDocument()
                expect(screen.queryByText('ページ移動')).toBeInTheDocument()
            })
    
            it('Should display my menu after click my menu', () => {
                render(
                    <MockedProvider>
                        <RecoilRoot>
                            <MainMenubar
                                isJoinTeam={true}
                                isCoach={true}
                                isMyTeamPage={true}
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
                    <MockedProvider>
                        <RecoilRoot>
                            <MainMenubar
                                isJoinTeam={true}
                                isCoach={true}
                                isMyTeamPage={true}
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

        describe('As General', () => {
            it('Should display my menu after click my menu', () => {
                render(
                    <MockedProvider>
                        <RecoilRoot>
                            <MainMenubar
                                isJoinTeam={true}
                                isCoach={false}
                                isMyTeamPage={true}
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
                    <MockedProvider>
                        <RecoilRoot>
                            <MainMenubar
                                isJoinTeam={true}
                                isCoach={false}
                                isMyTeamPage={true}
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
                    <MockedProvider>
                        <RecoilRoot>
                            <MainMenubar
                                isJoinTeam={true}
                                isCoach={false}
                                isMyTeamPage={true}
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
                    <MockedProvider>
                        <RecoilRoot>
                            <MainMenubar
                                isJoinTeam={true}
                                isCoach={false}
                                isMyTeamPage={true}
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
    })

    describe('Other Page', () => {
        describe('As Coach', () => {
            it('Should display my menu after click my menu', () => {
                render(
                    <MockedProvider>
                        <RecoilRoot>
                            <MainMenubar
                                isJoinTeam={true}
                                isCoach={true}
                                isMyTeamPage={false}
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
            it('Should display my menu after click my menu', () => {
                render(
                    <MockedProvider>
                        <RecoilRoot>
                            <MainMenubar
                                isJoinTeam={false}
                                isCoach={false}
                                isMyTeamPage={false}
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