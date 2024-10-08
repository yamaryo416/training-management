import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { TeamAuthModal } from '../components/organisms/modal/TeamAuthModal';
import { MainMenubar } from '../components/templates/MainMenubar';
import { mockMyProfileQuery, mockMyProfileWithoutTeamBoardQuery, mockUpdateMyProfileTeamBoardMutation } from '../mocks/mockProfileData';
import { mockCreateTeamMutation, mockErrorCreateTeamMutation, mockErrorOneTeamFromNameQuery, mockOneTeamFromNameQuery } from '../mocks/mockTeamData';

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

const mocksErrorJoinTeam = [
    mockMyProfileWithoutTeamBoardQuery(false, false),
    mockMyProfileWithoutTeamBoardQuery(false, false),
    mockErrorOneTeamFromNameQuery,
    mockUpdateMyProfileTeamBoardMutation
]

const mocksJoinTeam = [
    mockMyProfileWithoutTeamBoardQuery(false, false),
    mockMyProfileQuery(false, false),
    mockOneTeamFromNameQuery,
    mockUpdateMyProfileTeamBoardMutation
]

const mocksErrorCreateTeam = [
    mockMyProfileWithoutTeamBoardQuery(false, false),
    mockErrorCreateTeamMutation
]

const mocksCreateTeam = [
    mockMyProfileWithoutTeamBoardQuery(false, false),
    mockCreateTeamMutation
]

describe('Join Team', () => {
    describe('False', () => {
        it('Should display error message because name or password is not correct', async () => {
            render(
                <MockedProvider mocks={mocksErrorJoinTeam}>
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
            userEvent.click(screen.getByText('チーム加入'))
            userEvent.type(screen.getByTestId('name-form'), 'team')
            expect(await screen.findByTestId('modal-title')).toHaveTextContent('チームに加入')
            await new Promise(resolve => setTimeout(resolve, 1000));
            userEvent.click(screen.queryByTestId('confirm-team-join-button'))
            await new Promise(resolve => setTimeout(resolve, 1000));
            expect(screen.queryByText('チーム名もしくはパスワードが間違っています。')).toBeInTheDocument()
        })
    })

    describe('Success', () => {
        it('Souhld display success message', async () => {
            render(
                <MockedProvider mocks={mocksJoinTeam}>
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
            userEvent.click(screen.getByText('チーム加入'))
            userEvent.type(screen.getByTestId('name-form'), 'team')
            await new Promise(resolve => setTimeout(resolve, 1000));
            userEvent.click(screen.queryByTestId('confirm-team-join-button'))
            await new Promise(resolve => setTimeout(resolve, 1000));
            expect(screen.queryByTestId('join-team-name')).toHaveTextContent('team')
            userEvent.click(screen.getByText('加入する'))
            expect(await screen.findByText('チームに加入しました!')).toBeInTheDocument()
        })
    })
})

describe('Create Team', () => {
    describe('False', () => {
        it('Should display error message because name is already used', async () => {
            render(
                <MockedProvider mocks={mocksErrorCreateTeam}>
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
            userEvent.click(screen.getByText('チーム作成'))
            userEvent.type(screen.getByTestId('name-form'), 'team')
            await new Promise(resolve => setTimeout(resolve, 1000));
            userEvent.click(screen.queryByTestId('team-create-button'))
            expect(await screen.findByText('チーム名は既に使われています。')).toBeInTheDocument()
        })
    })

    describe('Success', () => {
        it('Souhld display success message', async () => {
            render(
                <MockedProvider mocks={mocksCreateTeam}>
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
            userEvent.click(screen.getByText('チーム作成'))
            userEvent.type(screen.getByTestId('name-form'), 'team')
            await new Promise(resolve => setTimeout(resolve, 1000));
            userEvent.click(screen.queryByTestId('team-create-button'))
            expect(await screen.findByText('チームを作成しました!')).toBeInTheDocument()
        })
    })
})