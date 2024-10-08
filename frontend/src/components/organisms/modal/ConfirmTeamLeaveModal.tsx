import { memo, VFC } from 'react'
import { Box, Heading, Flex, Text } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'

import { useDeleteMyProfileTeamBoard } from '../../../hooks/queries/useDeleteMyProfileTeamBoard'
import { useControllModal } from '../../../hooks/useControllModal'
import { confirmTeamLeaveModalState } from '../../../store/confirmTeamLeaveModalState'
import { DeleteButton } from '../../atoms/button/DeleteButton'
import { ModalLayout } from '../layout/ModalLayout'
import { useDeleteOneProfileTeamBoard } from '../../../hooks/queries/useDeleteOneProfileTeamBoard'

export const ConfirmTeamLeaveModal: VFC = memo(() => {
  const { onCloseConfirmTeamLeaveModal } = useControllModal()
  const { deleteMyProfileTeamBoard } = useDeleteMyProfileTeamBoard()
  const { deleteOneProfileTeamBoard } = useDeleteOneProfileTeamBoard()

  const confirmTeamLeaveModal = useRecoilValue(confirmTeamLeaveModalState)
  const { id, nickname, isMyself, isOpen } = confirmTeamLeaveModal

  return (
    <ModalLayout
      title=""
      isOpen={isOpen}
      onClose={onCloseConfirmTeamLeaveModal}
    >
      {isMyself ? (
        <Heading as="h3" fontSize="20px">
          チームを脱退します。
          <br />
          よろしいですか?
        </Heading>
      ) : (
        <>
          <Heading as="h3" fontSize="20px">
            以下のユーザーをチームから脱退させます。
            <br />
            よろしいですか?
          </Heading>
          <Flex>
            <Heading fontSize="18px">ニックネーム:</Heading>
            <Text pl={2} fontSize="16px" data-testid="team-leave-user-name">
              {nickname}
            </Text>
          </Flex>
        </>
      )}
      <Box textAlign="center">
        <DeleteButton
          name="team-leave"
          type="button"
          disabled={false}
          onClick={() =>
            isMyself
              ? deleteMyProfileTeamBoard()
              : deleteOneProfileTeamBoard(id)
          }
        >
          {isMyself ? '脱退する' : '脱退させる'}
        </DeleteButton>
      </Box>
    </ModalLayout>
  )
})
