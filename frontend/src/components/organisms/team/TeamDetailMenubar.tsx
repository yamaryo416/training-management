import { memo, VFC } from "react";
import { Button } from "@chakra-ui/button";
import { Box, Flex, Link } from "@chakra-ui/layout";
import { useRouter } from "next/router"

import { useGetMyProfile } from "../../../hooks/queries/useGetMyProfile";
import { CustomSpinner } from "../../atoms/spinner/CustomSpinner"
import { useControllModal } from "../../../hooks/useControllModal";

export const TeamDetailMenubar: VFC = memo(() => {
    const router = useRouter()

    const { onOpenConfirmTeamJoinModal } = useControllModal()
    const { dataMyProfile, loadingMyProfile } =useGetMyProfile()

    if (loadingMyProfile) return <CustomSpinner />
    
    return (
        <Box w={{ base: "350px", md: "auto"}}>
            <Flex justifyContent="space-between" alignItems="center" mb={10} zIndex="8">
                <Box ml={10}>
                    <Link fontSize={{ base: "10px", md: "16px" }} onClick={() => router.push("/teams")} color="orange">チーム一覧に戻る</Link>
                </Box>
                <Box>
                    {!dataMyProfile?.myProfile.teamBoard && (
                        <Button fontSize={{ base: "13px",  md: "16px" }} bg="rgb(255, 255, 0)" color="black" onClick={onOpenConfirmTeamJoinModal}>チームに加入する</Button>
                    )}
                </Box>
            </Flex>
        </Box>
    )
})