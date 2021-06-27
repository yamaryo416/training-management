import { Flex, Text } from "@chakra-ui/react";
import moment from "moment";
import { memo } from "react";
import { VFC } from "react";

type Props = {
    date: string;
    finishedPatern: string;
    count: number;
    load: number;
    distance: number;
    minitus: number;
}

export const TrainingFinishedItem: VFC<Props> = memo((props) => {
    const { date, finishedPatern, count, load, distance, minitus } = props
    
    return (
        <Flex fontSize='18px' py={3} borderBottom='solid 1px black' >
            <Text pl='20px' data-testid='training-finished-item-date'>
                {moment(date).format('YYYY年M月D日')}
            </Text>
            {finishedPatern.includes('1') && <Text pl={5}>{count}回</Text> }
            {finishedPatern.includes('2') && <Text pl={5}>{load}kg</Text> }
            {finishedPatern.includes('3') && <Text pl={5}>{distance}km</Text> }
            {finishedPatern.includes('4') && <Text pl={5}>{minitus}分</Text> }
            <Text pl={2}>実施</Text>
        </Flex>
    )
})