import React, { memo, VFC } from 'react'
import { Flex, Text } from '@chakra-ui/react'

export const Footer: VFC = memo(() => {
  return (
    <Flex
      fontSize={{ base: '13px', md: '15px' }}
      justify="flex-end"
      px={{ base: 5, md: 10 }}
      my={5}
      opacity="0.7"
    >
      <Text>&copy; 2021 Ryo Yamaguchi</Text>
    </Flex>
  )
})
