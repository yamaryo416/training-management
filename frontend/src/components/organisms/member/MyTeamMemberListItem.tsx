import 'moment/locale/ja'

import { memo, VFC } from "react"
import { Box, Flex, Text } from "@chakra-ui/layout"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InfoIcon from '@material-ui/icons/Info';

import { ProfileNodeType } from "../../../../types/queriesType";
import moment from "moment";
import { useControllModal } from "../../../hooks/useControllModal";

moment.locale('ja')

type Props = {
    member: ProfileNodeType;
}

export const MyTeamMemberListItem: VFC<Props> = memo((props) => {
    const { member } = props;

    const { onOpenOneMemberSelected } = useControllModal()

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
                <Box w={{ base: "110px", md: "160px" }}  pl="10px" fontSize={{ base: '12px', md: '16px' }}>
                    <Text data-testid={`${member.node.id}-member-join-date`}>{moment(member.node.joinAt).format("YYYY年M月D日(ddd)")}</Text>
                    <Text data-testid={`${member.node.id}-member-join-time`}>{moment(member.node.joinAt).format("H時m分")}</Text>
                </Box>
                <Text w={{ base: "50px", md: "80px" }} pl="10px" data-testid={`${member.node.id}-member-finished-schedule-count`}>
                    {member.node.finishedScheduleCount}回
                </Text>
                <Box pl={{ base: '10px', md: '10px' }} display={{ base: "none", md: "block" }}>
                    <InfoIcon
                        data-testid={`${member.node.id}-member-detail-as-md`}
                        onClick={() => onOpenOneMemberSelected(member.node.id, member.node.nickname, member.node.isCoach, false )}
                    />
                </Box>
                <Box pl={5} display={{ base: "block", md: "none" }}>
                    <InfoIcon
                        data-testid={`${member.node.id}-member-detail-as-base`}
                        onClick={() => onOpenOneMemberSelected(member.node.id, member.node.nickname, member.node.isCoach, true )}
                    />
                </Box>
            </Flex>
        </Box>
    )
})