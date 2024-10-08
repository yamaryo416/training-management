import 'moment/locale/ja'

import { memo, VFC } from 'react'
import { Flex } from '@chakra-ui/react'
import moment from 'moment'

import { useCalendar } from '../../../hooks/useCalendar'
import { SectionTitle } from '../../atoms/title/SectionTitle'
import { TODAY } from '../../../../constants'
import { useRecoilValue } from 'recoil'
import { scheduleOneDayState } from '../../../store/scheduleOneDayState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

moment.locale('ja')

export const CalendarDetailMenubar: VFC = memo(() => {
  const { onClickPreviousDate, onClickNextDate } = useCalendar()
  const oneDay = useRecoilValue(scheduleOneDayState)

  return (
    <Flex justify="space-between">
      <FontAwesomeIcon
        icon={faChevronLeft}
        onClick={onClickPreviousDate}
        data-testid="previous-date"
      />
      <SectionTitle>
        {oneDay === TODAY
          ? '今日のスケジュール'
          : `${moment(oneDay).format('M/D(ddd)')}のスケジュール`}
      </SectionTitle>
      <FontAwesomeIcon
        icon={faChevronRight}
        onClick={onClickNextDate}
        data-testid="next-date"
      />
    </Flex>
  )
})
