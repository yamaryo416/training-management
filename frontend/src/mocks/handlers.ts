import { mockGetMyFinishedSchedulesHandler, mockGetMyTeamFinishedSchedulesHandler, mockGetOneMemberFinishedSchedulesHandler } from "./mockFinishedSchedulesData";
import { mockGetMyTeamPostsHandler } from "./mockPostData";
import { mockGetMyProfileHandler, mockGetMyTeamMemberHandler } from "./mockProfileData";
import { mockGetMyTeamSchedulesHandler, mockGetOneDaySchedulesHandler } from "./mockScheduleData";
import { mockGetAllTeamBoardHandler } from "./mockTeamBoardData";
import { mockGetOneTeamFromIdHandler } from "./mockTeamData";
import { mockGetMyTeamTrainingsHandler } from "./mockTrainingData";

export const mainPageHandlers = [
    mockGetMyProfileHandler,
    mockGetMyTeamSchedulesHandler,
    mockGetOneDaySchedulesHandler,
    mockGetMyFinishedSchedulesHandler,
    mockGetMyTeamFinishedSchedulesHandler,
    mockGetMyTeamTrainingsHandler,
    mockGetMyTeamMemberHandler,
    mockGetMyTeamPostsHandler,
]

export const teamsPageHandlers = [
    mockGetMyProfileHandler,
    mockGetAllTeamBoardHandler
]

export const teamDetailPageHandler = [
    mockGetMyProfileHandler,
    mockGetOneTeamFromIdHandler
]

export const myTeamMemberPageHandler = [
    mockGetMyProfileHandler,
    mockGetMyTeamMemberHandler,
    mockGetOneMemberFinishedSchedulesHandler,
    mockGetMyTeamTrainingsHandler,
]