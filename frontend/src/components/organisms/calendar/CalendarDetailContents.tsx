import { memo, VFC } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";

import { ScheduleNodeType } from "../../../../types/queriesType";
import { TrainingIcon } from "../../molecules/TrainingIcon";

type Props = ScheduleNodeType;

export const CalendarDetailContents: VFC<Props> = memo((props) => {
    const { node } = props;

    return (
        <Flex alignItems="center">
            <Box>
                <TrainingIcon iconNumber={node.training.iconNumber} color="white" size="50px" />
            </Box>
            <Text pl={1} pr={3} textAlign="left" w='150px' data-testid={node.id + '-schedule-training'}>
                {node.training.title}
            </Text>
        </Flex>
    )
})