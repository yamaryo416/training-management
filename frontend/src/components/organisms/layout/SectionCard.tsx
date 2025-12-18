import { memo, ReactNode, VFC } from 'react'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

type Props = {
  width: string
  children: ReactNode
}

export const SectionCard: VFC<Props> = memo((props) => {
  const { width, children } = props

  return (
    <Box
      as={motion.div}
      whileHover={{ scale: 1.02 }}
      transition="all 0.3s ease"
      w={{ base: '350px', md: width }}
      pt={6}
      pb={8}
      px={6}
      mb="30px"
      mr="30px"
      ml={{ base: '20px', md: '0px' }}
      borderRadius="2xl"
      bg="white"
      boxShadow="lg"
      borderWidth="1px"
      borderColor="gray.100"
      fontSize={{ md: '16px' }}
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        bgGradient: 'linear(to-r, brand.400, orange.300)',
      }}
    >
      {children}
    </Box>
  )
})
