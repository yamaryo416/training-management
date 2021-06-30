import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { MainMenubar } from '../../../templates/MainMenubar';
import { MyProfileEditModal } from '../MyProfileEditModal';
import { mockMyProfileQuery, mockMyProfileWithoutTeamBoardQuery } from '../../../../mocks/mockProfileData';

afterEach(cleanup)

const mocksAsCoach = [
    mockMyProfileQuery(true, false),
]

const mocksAsGeneral = [
    mockMyProfileQuery(false, false),
]

const mocksAsNotJoinTeam = [
    mockMyProfileWithoutTeamBoardQuery(false, false),
]

describe('MyProfileEdithModal', () => {
    describe('As Coach', () => {
        beforeEach(() => {
            jest.setTimeout(30000)
            render(
                <MockedProvider mocks={mocksAsCoach}>
                    <RecoilRoot>
                        <MainMenubar
                            isJoinTeam={true}
                            isCoach={true}
                            isMyTeamPage={false}
                            isGuest={false}
                        />
                        <MyProfileEditModal />
                    </RecoilRoot>
                </MockedProvider>
            )
            userEvent.click(screen.getByText('メニュー'))
            userEvent.click(screen.getByText('プロフィール編集'))
        })

        it('Sould render correct content', async () => {
            expect(await screen.findByTestId('modal-title')).toHaveTextContent('プロフィール編集')
            expect(await screen.findByText('チームから脱退する')).toBeInTheDocument()
            expect(screen.queryByText('アカウントを削除する')).toBeInTheDocument()
            expect(screen.queryByText('戻る')).toBeInTheDocument()
        })

        it('Should display error message because click team leave button', async () => {
            expect(await screen.findByTestId('modal-title')).toHaveTextContent('プロフィール編集')
            userEvent.click(await screen.findByText('チームから脱退する'))
            expect(await screen.findByText('コーチの権限を他のユーザーに委譲してください。')).toBeInTheDocument()
            await new Promise(resolve => setTimeout(resolve, 5000));
        })

        it('Should display error message because click account delete button', async () => {
            expect(await screen.findByTestId('modal-title')).toHaveTextContent('プロフィール編集')
            userEvent.click(await screen.findByText('アカウントを削除する'))
            expect(await screen.findByText('コーチの権限を他のユーザーに委譲してください。')).toBeInTheDocument()
        })

        it('Should display error message becaouse nickname is blank', async () => {
            expect(await screen.findByTestId('modal-title')).toHaveTextContent('プロフィール編集')
            userEvent.clear(await screen.findByTestId('nickname-form'))
            userEvent.type(screen.queryByTestId('nickname-form'), '')
            userEvent.click(screen.queryByTestId('modal-title'))
            expect(await screen.findByText('1文字以上入力してください。')).toBeInTheDocument()
            expect(screen.queryByTestId('profile-edit-button')).toHaveAttribute('disabled')
        })

        it('Should display error message becaouse nickname is blank', async () => {
            expect(await screen.findByTestId('modal-title')).toHaveTextContent('プロフィール編集')
            userEvent.clear(await screen.findByTestId('nickname-form'))
            userEvent.type(screen.queryByTestId('nickname-form'), 'a'.repeat(21))
            userEvent.click(screen.queryByTestId('modal-title'))
            expect(await screen.findByText('20文字以内で入力してください')).toBeInTheDocument()
            expect(screen.queryByTestId('profile-edit-button')).toHaveAttribute('disabled')
        })
    })

    describe('As General User', () => {
        it('Sould render correct content', async () => {
            render(
                <MockedProvider mocks={mocksAsGeneral}>
                    <RecoilRoot>
                        <MainMenubar
                            isJoinTeam={true}
                            isCoach={false}
                            isMyTeamPage={false}
                            isGuest={false}
                        />
                        <MyProfileEditModal />
                    </RecoilRoot>
                </MockedProvider>
            )
            userEvent.click(screen.getByText('メニュー'))
            userEvent.click(screen.getByText('プロフィール編集'))
            expect(await screen.findByTestId('modal-title')).toHaveTextContent('プロフィール編集')
            expect(await screen.findByText('チームから脱退する')).toBeInTheDocument()
            expect(screen.queryByText('アカウントを削除する')).toBeInTheDocument()
            expect(screen.queryByText('戻る')).toBeInTheDocument()
        })
    })

    describe('As Not Join Team User', () => {
        it('Sould render correct content', async () => {
            render(
                <MockedProvider mocks={mocksAsNotJoinTeam} >
                    <RecoilRoot>
                        <MainMenubar
                            isJoinTeam={true}
                            isCoach={false}
                            isMyTeamPage={false}
                            isGuest={false}
                        />
                        <MyProfileEditModal />
                    </RecoilRoot>
                </MockedProvider>
            )
            userEvent.click(screen.getByText('メニュー'))
            userEvent.click(screen.getByText('プロフィール編集'))
            expect(await screen.findByTestId('modal-title')).toHaveTextContent('プロフィール編集')
            expect(await screen.findByText('アカウントを削除する')).toBeInTheDocument()
            expect(screen.queryByText('チームから脱退する')).not.toBeInTheDocument()
            expect(screen.queryByText('戻る')).toBeInTheDocument()
        })
    })
})

