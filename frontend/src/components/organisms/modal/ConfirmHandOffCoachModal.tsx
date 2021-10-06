import { memo, VFC } from "react";
import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import { useRecoilValue } from "recoil";

import { useUpdateTeamBoardCoach } from "../../../hooks/queries/useUpdateTeamBoardCoach";
import { useControllModal } from "../../../hooks/useControllModal";
import { confirmHandOffCoachModalState } from "../../../store/confirmHandOffCoachModalState";
import { ModalLayout } from "../layout/ModalLayout";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { Flex } from "@chakra-ui/react";

export const ConfirmHandOffCoachModal: VFC = memo(() => {
    const { onCloseConfirmHandOffCoachModal } = useControllModal()
    const { updateTeamBoardCoach } = useUpdateTeamBoardCoach()

    const confirmHandOffCoachModal = useRecoilValue(confirmHandOffCoachModalState)
    const { id, nickname, isOpen } = confirmHandOffCoachModal

    return (
        <ModalLayout
            title=""
            isOpen={isOpen}
            onClose={onCloseConfirmHandOffCoachModal}
        >
            <Heading as="h3" fontSize="20px">
                以下のユーザーにコーチ権限を委譲します。<br/>よろしいですか？
            </Heading>
            <Flex>
                <Heading fontSize='18px'>ユーザー名:</Heading>
                <Text pl={2} fontSize='16px' data-testid='hand-off-coach-user-name'>{nickname}</Text>
            </Flex>
            <Box textAlign="center">
                <PrimaryButton
                    name='hand-off-coach'
                    type='button'
                    disabled={false}
                    onClick={()=>{
                        updateTeamBoardCoach(id)
                }}>
                    委譲する
                </PrimaryButton>
            </Box>
        </ModalLayout>

    )
})