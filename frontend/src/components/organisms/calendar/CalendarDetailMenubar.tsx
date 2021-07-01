import 'moment/locale/ja'

import { memo, VFC } from "react";
import { Flex } from "@chakra-ui/layout";
import moment from "moment";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { useCalendar } from "../../../hooks/useCalendar";
import { SectionTitle } from "../../atoms/title/SectionTitle";
import { TODAY } from "../../../../constants";
import { useRecoilValue } from "recoil";
import { scheduleOneDayState } from "../../../store/scheduleOneDayState";

moment.locale('ja')

export const CalendarDetailMenubar: VFC = memo(() => {
    const { onClickPreviousDate, onClickNextDate } = useCalendar()
    const oneDay = useRecoilValue(scheduleOneDayState)

    return (
        <Flex justify="space-between">
            <ArrowBackIosIcon onClick={onClickPreviousDate} data-testid='previous-date' />
            <SectionTitle>
                {oneDay === TODAY ? "今日のスケジュール" : `${moment(oneDay).format("M/D(ddd)")}のスケジュール` }
            </SectionTitle>
            <ArrowForwardIosIcon onClick={onClickNextDate} data-testid='next-date' />
        </Flex>
    )
})