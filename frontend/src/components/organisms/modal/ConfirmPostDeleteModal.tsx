import { useRecoilValue } from "recoil";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { memo, VFC } from "react";

import { useDeletePost } from "../../../hooks/queries/useDeletePost";
import { useControllModal } from "../../../hooks/useControllModal";
import { confirmPostDeleteModalState } from "../../../store/confirmPostDeleteModalState";
import { DeleteButton } from "../../atoms/button/DeleteButton";
import { ModalLayout } from "../layout/ModalLayout";
import { Flex } from "@chakra-ui/react";

export const ConfirmPostDeleteModal: VFC = memo(() => {
    const { deletePost } = useDeletePost()
    const { onCloseConfirmPostDeleteModal } = useControllModal()

    const confirmPostDeleteModal = useRecoilValue(confirmPostDeleteModalState)
    const { id, text, isOpen } = confirmPostDeleteModal

    return (
        <ModalLayout
            title=""
            isOpen={isOpen}
            onClose={onCloseConfirmPostDeleteModal}
        >
            <Heading as="h3" fontSize="20px">
                以下の投稿を削除します。<br/>よろしいですか?
            </Heading>
            <Flex>
                <Heading fontSize='18px'>投稿内容:</Heading>
                <Text pl={2} fontSize='16px' data-testid='delete-post-text'>{text}</Text>
            </Flex>
            <Box textAlign="center">
                <DeleteButton
                    name='delete-post'
                    type='button'
                    disabled={false}
                    onClick={() => deletePost(id)}
                >
                    削除
                </DeleteButton>
            </Box>
        </ModalLayout>
    )
})