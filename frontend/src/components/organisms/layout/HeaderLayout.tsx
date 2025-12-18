import { Box, Flex, Text } from '@chakra-ui/react'
import { memo, ReactNode, VFC } from 'react'
import { motion } from 'framer-motion'

import { PageTitle } from '../../atoms/title/PageTitle'
import { TutorialText } from '../../atoms/text/TutorialText'

type Props = {
  title: string
  isLogin: boolean
  children: ReactNode
}

export const HeaderLayout: VFC<Props> = memo((props) => {
  const { title, children, isLogin } = props

  return (
    <Box
      as={motion.div}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: "0.3s" }}
      pos="fixed"
      bg="white"
      width="100%"
      height="80px"
      as="nav"
      zIndex="10"
      boxShadow="sm"
      borderBottom="1px"
      borderColor="gray.100"
    >
      <Flex
        justify="space-between"
        align="center"
        wrap="wrap"
        bg="transparent"
        px={{ base: 5, md: 10 }}
        color="gray.800"
        lineHeight="80px"
        fontSize={{ md: '16px' }}
      >
        {children}
      </Flex>
      <PageTitle>{title}</PageTitle>
      {isLogin && <TutorialText />}
    </Box>
  )
})
