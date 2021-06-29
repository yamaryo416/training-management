import { mockGetMyFinishedSchedulesHandler, mockGetMyTeamFinishedSchedulesHandler } from "./mockFinishedSchedulesData";
import { mockGetMyTeamPostsHandler } from "./mockPostData";
import { mockGetMyProfileHandler, mockGetMyTeamMemberHandler } from "./mockProfileData";
import { mockGetMyTeamSchedulesHandler, mockGetOneDaySchedulesHandler } from "./mockScheduleData";
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