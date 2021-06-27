import { memo, VFC } from "react";

import { TeamAuthModal } from "../organisms/modal/TeamAuthModal";
import { TrainingCreateOrUpdateModal } from "../organisms/modal/TrainingCreateOrUpdateModal";
import { ConfirmTrainingDeleteModal } from "../organisms/modal/ConfirmTrainingDeleteModal";
import { ScheduleCreateModal } from "../organisms/modal/ScheduleCreateModal";
import { ConfirmScheduleDeleteModal } from "../organisms/modal/ConfirmScheduleDeleteModal";
import { ScheduleDeleteModal } from "../organisms/modal/ScheduleDeleteModal";
import { MyProfileEditModal } from "../organisms/modal/MyProfileEditModal";
import { ConfirmTeamLeaveModal } from "../organisms/modal/ConfirmTeamLeaveModal";
import { ConfirmUserDeleteModal } from "../organisms/modal/ConfirmUserDeleteModal";
import { TeamEditModal } from "../organisms/modal/TeamEditModal";
import { ConfirmPostDeleteModal } from "../organisms/modal/ConfirmPostDeleteModal";
import { TrainingDetailModal } from "../organisms/modal/TrainingDetailModal";
import { FinishedScheduleCreateModal } from "../organisms/modal/FinishedScheduleCreateModal";
import { ConfirmFinishedScheduleDeleteModal } from "../organisms/modal/ConfirmFinishedScheduleDeleteModal";
import { FinishedScheduleMemberListModal } from "../organisms/modal/FinishedScheduleMemberListModal";
import { ConfirmHandOffCoachModal } from "../organisms/modal/ConfirmHandOffCoachModal";

type Props = {
    isJoinTeam: boolean;
    isCoach: boolean;
    page: "myPage" | "myTeamMemberPage" | "teamListPage" | "teamDetailPage"
}

export const ModalSection: VFC<Props> = memo((props) => {
    const {isJoinTeam, isCoach, page } = props;

    return (
        <>
            <MyProfileEditModal />
            <ConfirmUserDeleteModal />
            {isJoinTeam ? (
                <ConfirmTeamLeaveModal />
            ) : (
                <TeamAuthModal />
            )}
                    {page === "myPage" && (
                <>
                    <ConfirmPostDeleteModal />
                    <TrainingDetailModal/>
                    <FinishedScheduleCreateModal />
                    <ConfirmFinishedScheduleDeleteModal />
                </>
            )}
            {(page === "myPage" || page === "myTeamMemberPage") && isCoach && (
                <>
                    <TeamEditModal />
                    <TrainingCreateOrUpdateModal />
                    <ConfirmTrainingDeleteModal />
                    <ScheduleCreateModal />
                    <ConfirmScheduleDeleteModal />
                    <ScheduleDeleteModal />
                    <FinishedScheduleMemberListModal />
                    <ConfirmHandOffCoachModal />
                </>
            )}
        </>
    )
})