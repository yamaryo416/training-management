import '@testing-library/jest-dom/extend-expect'

import { render, screen, cleanup } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing' 
import userEvent from '@testing-library/user-event'

import { mockMyTeamSchedulesQuery, mockTodaySchedulesQuery, mockErrorMyTeamScheduleQuery } from '../../../mocks/mockScheduleData';
import { mockMyProfileQuery } from '../../../mocks/mockProfileData';
import { MyTeamCalendarSection } from '../MyTeamCalendarSection';

afterEach(cleanup)

describe('MyTeamCalendarSection', () => {
  const mocks = [
      mockMyProfileQuery(true, false),
      mockTodaySchedulesQuery,
      mockMyTeamSchedulesQuery,
      mockMyTeamSchedulesQuery,
  ]

  const mocksError = [
    mockMyProfileQuery(true, false),
    mockTodaySchedulesQuery,
    mockErrorMyTeamScheduleQuery,
  ]

    it('Should render without error', () => {
        render(
            <MockedProvider mocks={mocks}>
                <RecoilRoot>
                    <MyTeamCalendarSection />
                </RecoilRoot>
            </MockedProvider>
        )
        expect(screen.queryAllByText('Loading...')[0]).toBeInTheDocument()
    })

  it('Should display next week schedule after next week icon', async () => {
    render(
        <MockedProvider mocks={mocks}>
            <RecoilRoot>
                <MyTeamCalendarSection />
            </RecoilRoot>
        </MockedProvider>
    )
    await new Promise(resolve => setTimeout(resolve, 5000));
    screen.debug()
    expect(screen.getAllByRole('img')[3]).toHaveAttribute('src', '/icon/white-barbell.png')
    userEvent.click(screen.getByTestId('next-week'))
    expect(screen.getAllByRole('img')[3]).toHaveAttribute('src', '/icon/white-barbell-squat.png')
  })

  it('Should render error message', async () => {
    render(
        <MockedProvider mocks={mocksError}>
            <RecoilRoot>
                <MyTeamCalendarSection />
            </RecoilRoot>
        </MockedProvider>
    )
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(screen.queryAllByText('データの取得に失敗しました。')[0]).toBeInTheDocument()
  })
})