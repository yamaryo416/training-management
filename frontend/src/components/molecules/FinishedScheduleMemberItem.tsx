import { memo, VFC } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

type Props = {
  isFinished: boolean
  nickname: string
}

export const FinishedScheduleMemberItem: VFC<Props> = memo((props) => {
  const { isFinished, nickname } = props

  return (
    <Flex alignItems="center" mb={3}>
      <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: '40px' }} />
      <Text
        pl={2}
        data-testid={
          isFinished
            ? 'finished-schedule-member-nickname'
            : 'not-finished-schedule-member-nickname'
        }
      >
        {nickname}
      </Text>
    </Flex>
  )
})
