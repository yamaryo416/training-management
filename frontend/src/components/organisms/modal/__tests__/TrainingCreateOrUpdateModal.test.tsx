import '@testing-library/jest-dom/extend-expect'

import { cleanup, render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { MainMenubar } from '../../../templates/MainMenubar';
import { TrainingCreateOrUpdateModal } from '../TrainingCreateOrUpdateModal';

afterEach(cleanup)

describe('TrainingCreateModal', () => {
    beforeEach(() => {
        jest.setTimeout(30000)
        render(
            <MockedProvider>
                <RecoilRoot>
                    <MainMenubar
                        isJoinTeam={true}
                        isCoach={true}
                        isMyTeamPage={true}
                        isGuest={false}
                    />
                    <TrainingCreateOrUpdateModal />
                </RecoilRoot>
            </MockedProvider>
        )
        userEvent.click(screen.getByText('メニュー'))
        userEvent.click(screen.getByText('トレーニング作成'))
    })

    it('Should display join team modal', async () => {
        expect(await screen.findByTestId('modal-title')).toHaveTextContent('トレーニング作成')
        expect(screen.queryByTestId('description-form')).toBeInTheDocument()
        expect(screen.queryByTestId('change-icon-select-mode')).toBeInTheDocument()
        expect(screen.queryByTestId('finished-patern-1')).toBeInTheDocument()
        expect(screen.queryByTestId('finished-patern-2')).toBeInTheDocument()
        expect(screen.queryByTestId('finished-patern-3')).toBeInTheDocument()
        expect(screen.queryByTestId('finished-patern-4')).toBeInTheDocument()
        expect(screen.queryByTestId('training-create-button')).toBeInTheDocument()
        expect(screen.queryByText('戻る')).toBeInTheDocument()
    })

    it('Should display many icon after click icon select mode', async () => {
        expect(await screen.findByTestId('modal-title')).toHaveTextContent('トレーニング作成')
        userEvent.click(screen.getByTestId('change-icon-select-mode'))
        expect(await screen.findByTestId('black-training-icon-1')).toHaveAttribute('src', '/icon/black-barbell.png')
        expect(screen.queryByTestId('black-training-icon-11')).toHaveAttribute('src', '/icon/black-cycling.png')
    })

    it('Should disabled training create button when title is blank', async () => {
        expect(await screen.findByTestId('modal-title')).toHaveTextContent('トレーニング作成')
        userEvent.clear(await screen.findByTestId('title-form'))
        userEvent.click(screen.getByTestId('modal-title'))
        expect(await screen.findByText('1文字以上入力してください。'))
        expect(screen.queryByTestId('training-create-button')).toHaveAttribute('disabled')
    })

    it('Should disabled training create button when title is too long', async () => {
        expect(await screen.findByTestId('modal-title')).toHaveTextContent('トレーニング作成')
        userEvent.type(screen.queryByTestId('title-form'), 'a'.repeat(21))
        userEvent.click(screen.getByTestId('modal-title'))
        expect(await screen.findByText('20文字以内で入力してください'))
        expect(screen.queryByTestId('training-create-button')).toHaveAttribute('disabled')
    })
})