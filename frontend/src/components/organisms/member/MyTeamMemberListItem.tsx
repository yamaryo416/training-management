import { memo, VFC } from "react"
import { Box, Flex, Text } from "@chakra-ui/layout"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InfoIcon from '@material-ui/icons/Info';

import { ProfileNodeType } from "../../../../types/queriesType";
import moment from "moment";

type Props = {
    member: ProfileNodeType;
}

export const MyTeamMemberListItem: VFC<Props> = memo((props) => {
    const { member } = props;

    return (
        <Box key={member.node.id}>
            <Flex borderBottom="1px solid #718096" py={3} alignItems="center" fontSize={{ base: '13px', md: '16px'}}>
                <Box w={{ base: "40px", md: "50px" }}>
                    <AccountCircleIcon style={{ fontSize: 30 }} />
                </Box>
                <Text
                    w={{ base: '100px', md: '130px'}}
                    display={{ base: "none", md: "block"}}
                    data-testid={`${member.node.id}-member-nickname`}
                    onClick={() => null}
                >
                    {member.node.nickname}
                </Text>
                <Text
                    w="60px"
                    display={{ base: "block", md: "none"}}
                    onClick={() => null}
                >
                    {member.node.nickname}
                </Text>
                <Box w={{ base: "110px", md: "140px" }}  pl="10px">
                    <Text data-testid={`${member.node.id}-member-join-date`}>{moment(member.node.joinAt).format("YYYY年M月D日")}</Text>
                    <Text data-testid={`${member.node.id}-member-join-time`}>{moment(member.node.joinAt).format("H時m分")}</Text>
                </Box>
                <Text w={{ base: "50px", md: "80px" }} pl="10px" data-testid={`${member.node.id}-member-finished-schedule-count`}>
                    {member.node.finishedScheduleCount}回
                </Text>
                <Box pl={5} display={{ base: "none", md: "block" }}>
                    <InfoIcon
                        data-testid={`${member.node.id}-member-detail-as-md`}
                        onClick={() => null}
                    />
                </Box>
                <Box pl={5} display={{ base: "block", md: "none" }}>
                    <InfoIcon
                        data-testid={`${member.node.id}-member-detail-as-base`}
                        onClick={() => null}
                    />
                </Box>
            </Flex>
        </Box>
    )
})