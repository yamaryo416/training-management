import moment from 'moment';
import { atom } from 'recoil'

import { FIRSTDATE, TODAY } from '../../constants';

type StateType = {
    firstDate: moment.Moment;
    today: string;
    todayDiff: number;
}

export const calendarDateState = atom<StateType>({
    key: "calendarDateState",
    default: {
        firstDate: FIRSTDATE,
        today: TODAY,
        todayDiff: 0
    }
});
