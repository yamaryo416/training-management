import { memo, VFC } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

type Props = {
  nickname: string
}

export const PostMemberItem: VFC<Props> = memo((props) => {
  const { nickname } = props

  return (
    <Box textAlign="center">
      <FontAwesomeIcon icon={faCircleUser} />
      <Text
        w={{ base: '60px', md: '80px' }}
        fontSize={{ base: '10px', md: '16px' }}
      >
        {nickname}
      </Text>
    </Box>
  )
})
