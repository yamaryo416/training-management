import { memo, VFC } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout"
import AccountCircle from "@material-ui/icons/AccountCircle";
import moment from "moment";

type Props = {
    id: string;
    title: string;
    date: string;
    nickname: string;
    count: number;
    load: number;
    distance: number;
    minitus: number;
    comment: string;
}

export const FinishedScheduleLogsItem: VFC<Props> = memo((props) => {
    const { id ,title, date, nickname, count, load, distance, minitus, comment } = props
    return (
        <Box py={3} borderBottom='1px solid #718096'>
            <Flex alignItems='center'>
                <AccountCircle style={{  fontSize: 40 }} />
                <Text pl={2} data-testid={`${id}-finished-schedule-nickname`}>{nickname}</Text>
                <Text pl={5} data-testid={`${id}-finished-schedule-date`}>{moment(date).format('M月D日')}</Text>
            </Flex>
            <Flex pt={2}>
                <Text pl='45px' data-testid={`${id}-finished-schedule-title`}>{title}</Text>
                {count !== 0 && <Text pl={2} data-testid={`${id}-finished-schedule-count`}>{count}回</Text>}
                {load !== 0 && <Text pl={2} data-testid={`${id}-finished-schedule-load`}>{load}kg</Text>}
                {distance !== 0 && <Text pl={2} data-testid={`${id}-finished-schedule-distance`}>{distance}km</Text>}
                {minitus !== 0 && <Text pl={2} data-testid={`${id}-finished-schedule-minitus`}>{minitus}分</Text>}
                <Text pl={2} color='yellow'>実施!</Text>
            </Flex>
            {comment !== '' && <Text pl='45px' pt={2} data-testid={`${id}-finished-schedule-comment`}>コメント: {comment}</Text>}
        </Box>
    )
})