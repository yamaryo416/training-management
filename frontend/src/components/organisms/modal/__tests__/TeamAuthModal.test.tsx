import '@testing-library/jest-dom/extend-expect'

import { cleanup, render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { MainMenubar } from '../../../templates/MainMenubar';
import { TeamAuthModal } from '../TeamAuthModal';

afterEach(cleanup)

describe('TeamAuthModal', () => {
    beforeEach(() => {
        jest.setTimeout(30000)
        render(
            <MockedProvider>
                <RecoilRoot>
                    <MainMenubar
                        isJoinTeam={false}
                        isCoach={false}
                        isMyTeamPage={false}
                        isGuest={false}
                    />
                    <TeamAuthModal />
                </RecoilRoot>
            </MockedProvider>
        )
        userEvent.click(screen.getByText('メニュー'))
    })

    it('Should display join team modal', async () => {
        userEvent.click(screen.getByText('チーム加入'))
        expect(await screen.findByTestId('modal-title')).toHaveTextContent('チームに加入')
        expect(screen.queryByText('チームを作成する場合はこちら')).toBeInTheDocument()
        expect(screen.queryByText('戻る')).toBeInTheDocument()
    })

    it('Should display create team modal', async () => {
        userEvent.click(screen.getByText('チーム作成'))
        expect(await screen.findByTestId('modal-title')).toHaveTextContent('チーム作成')
        expect(screen.queryByText('既にあるチームに加入する場合はこちら')).toBeInTheDocument()
        expect(screen.queryByText('戻る')).toBeInTheDocument()
    })

    it('Should change mode after change mode button', async () => {
        userEvent.click(screen.getByText('チーム加入'))
        userEvent.click(await screen.findByText('チームを作成する場合はこちら'))
        expect(screen.queryByTestId('modal-title')).toHaveTextContent('チーム作成')
        userEvent.click(screen.queryByText('既にあるチームに加入する場合はこちら'))
        expect(await screen.findByTestId('modal-title')).toHaveTextContent('チームに加入')
    })

    it('Should display error message because name is blank', async () => {
        userEvent.click(screen.getByText('チーム加入'))
        expect(await screen.findByTestId('modal-title')).toHaveTextContent('チームに加入')
        userEvent.type(screen.getByTestId('name-form'), '')
        userEvent.click(screen.getByText('チームに加入'))
        expect(await screen.findByText('1文字以上入力してください。')).toBeInTheDocument()
        expect(screen.queryByTestId('confirm-team-join-button')).toHaveAttribute('disabled')
    })

    it('Should display error message because name is too long', async () => {
        userEvent.click(screen.getByText('チーム加入'))
        expect(await screen.findByTestId('modal-title')).toHaveTextContent('チームに加入')
        userEvent.type(screen.getByTestId('name-form'), 'a'.repeat(21))
        userEvent.click(screen.getByText('チームに加入'))
        expect(await screen.findByText('20文字以内で入力してください。')).toBeInTheDocument()
        expect(screen.queryByTestId('confirm-team-join-button')).toHaveAttribute('disabled')
    })

    it('Should display error message because password is blank', async () => {
        userEvent.click(screen.getByText('チーム加入'))
        expect(await screen.findByTestId('modal-title')).toHaveTextContent('チームに加入')
        userEvent.click(screen.getByTestId('is-limit-join'))
        userEvent.clear(screen.getByTestId('password-form'))
        userEvent.type(screen.getByTestId('name-form'), 'team')
        userEvent.click(screen.getByText('チームに加入'))
        expect(await screen.findByText('パスワードは必須です。')).toBeInTheDocument()
        expect(screen.queryByTestId('confirm-team-join-button')).toHaveAttribute('disabled')
    })

    it('Should display error message because password is invalid', async () => {
        userEvent.click(screen.getByText('チーム加入'))
        expect(await screen.findByTestId('modal-title')).toHaveTextContent('チームに加入')
        userEvent.click(screen.getByTestId('is-limit-join'))
        userEvent.clear(await screen.findByTestId('password-form'))
        userEvent.type(screen.getByTestId('password-form'), 'hogehoge')
        userEvent.type(screen.getByTestId('name-form'), 'team')
        userEvent.click(screen.getByText('チームに加入'))
        expect(await screen.findByText('4桁の数字を入力してください。')).toBeInTheDocument()
        expect(screen.queryByTestId('confirm-team-join-button')).toHaveAttribute('disabled')
    })
})