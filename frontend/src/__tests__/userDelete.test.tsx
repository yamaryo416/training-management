import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'
import { MainMenubar } from '../components/templates/MainMenubar';
import { MyProfileEditModal } from '../components/organisms/modal/MyProfileEditModal';
import { mockMyProfileQuery } from '../mocks/mockProfileData';
import { ConfirmUserDeleteModal } from '../components/organisms/modal/ConfirmUserDeleteModal';
import { mockDeleteUserMutation } from '../mocks/mockUserData';

jest.mock("next/router", () => ({
    useRouter() {
      return {
        push: () => null
      };
    }
  }));

beforeEach(() => {
    jest.setTimeout(30000)
})

afterEach(cleanup)

const mocks = [
    mockMyProfileQuery(false, false),
    mockDeleteUserMutation
]

describe('User Delete', () => {
    describe('Success', () => {
        it('Should display success message', async () => {
            render(
                <MockedProvider mocks={mocks} >
                    <RecoilRoot>
                        <MainMenubar
                            isJoinTeam={true}
                            isCoach={false}
                            isMyTeamPage={false}
                            isGuest={false}
                        />
                        <MyProfileEditModal />
                        <ConfirmUserDeleteModal />
                    </RecoilRoot>
                </MockedProvider>
            )
            userEvent.click(screen.getByText('メニュー'))
            userEvent.click(screen.getByText('プロフィール編集'))
            expect(await screen.findByTestId('modal-title')).toHaveTextContent('プロフィール編集')
            userEvent.click(screen.getByTestId('confirm-user-delete-button'))
            userEvent.click(await screen.findByTestId('user-delete-button'))
            expect(await screen.findByText('ユーザーを削除しました。')).toBeInTheDocument()
        })
    })
})