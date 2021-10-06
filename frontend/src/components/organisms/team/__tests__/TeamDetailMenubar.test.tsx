import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 

import { TeamDetailMenubar } from '../TeamDetailMenubar';
import { mockMyProfileQuery, mockMyProfileWithoutTeamBoardQuery } from '../../../../mocks/mockProfileData';

afterEach(cleanup)

describe('TeamDetailMenubar', () => {
    describe('My profile with Team board', () => {
        it('Should correct contents', async () => {
            render (
                <MockedProvider mocks={[ mockMyProfileQuery(false, false) ]}>
                    <RecoilRoot>
                        <TeamDetailMenubar />
                    </RecoilRoot>
                </MockedProvider>
            )
            expect(await screen.findByText('チーム一覧に戻る')).toBeInTheDocument()
            expect(screen.queryByText('チームに加入する')).not.toBeInTheDocument()
        })
    })

    describe('My profile without Team board', () => {
        it('Should correct contents', async () => {
            render (
                <MockedProvider mocks={[ mockMyProfileWithoutTeamBoardQuery(false, false) ]}>
                    <RecoilRoot>
                        <TeamDetailMenubar />
                    </RecoilRoot>
                </MockedProvider>
            )
            expect(await screen.findByText('チームに加入する')).toBeInTheDocument()
        })
    })
})