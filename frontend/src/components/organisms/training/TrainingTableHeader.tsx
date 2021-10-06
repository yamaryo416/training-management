import { Box, Flex, Text } from "@chakra-ui/layout";
import { memo, VFC } from "react";
import { useGetMyProfile } from "../../../hooks/queries/useGetMyProfile";

type Props = {
    isMyTeam: boolean;
}

export const TrainingTableHeader: VFC<Props> = memo((props) => {
    const { isMyTeam } = props;

    const { dataMyProfile } = useGetMyProfile()

    return (
        <Flex borderBottom="1px solid #718096">
            <Box w={{ base: "30px", md: "60px"}}></Box>
            <Text  w={{ base: "130px", md: "140px"}}>タイトル</Text>
            {isMyTeam && !dataMyProfile?.myProfile.isGuest && <Text>実施回数</Text> }
        </Flex>
    )
})