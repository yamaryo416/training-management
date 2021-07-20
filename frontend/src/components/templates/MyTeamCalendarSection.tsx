import { memo, VFC } from "react"

import { Calendar } from "../organisms/calendar/Calendar"
import { CalendarMenubar } from "../organisms/calendar/CalendarMenubar"
import { MyTeamCalendarDetail } from "../organisms/calendar/MyTeamCalendarDetail"
import { SectionCard } from "../organisms/layout/SectionCard"
import { useGetMyTeamWeekSchedules } from "../../hooks/queries/useGetMyTeamWeekSchedules"
import { CustomSpinner } from "../atoms/spinner/CustomSpinner"
import { FailedText } from "../atoms/text/FailedText"

export const MyTeamCalendarSection: VFC = memo(() => {
    const { loadingMyTeamWeekSchedules, dataMyTeamWeekSchedules, errorMyTeamWeekSchedules } = useGetMyTeamWeekSchedules()

    return (
        <SectionCard width="400px">
            <MyTeamCalendarDetail />
            <CalendarMenubar />
            {loadingMyTeamWeekSchedules ? (
                <CustomSpinner />
            ) : (
                <>
                    {errorMyTeamWeekSchedules ?
                        <FailedText /> :
                        <Calendar schedules={dataMyTeamWeekSchedules?.myTeamWeekSchedules} />
                    }
                </>
            )}
        </SectionCard>
    )
})
