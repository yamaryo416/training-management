import { memo, ReactNode, VFC } from 'react'
import { Heading } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

export const SectionTitle: VFC<Props> = memo((props) => {
  const { children } = props

  return (
    <Heading
      as="h3"
      fontSize={{ base: '18px', md: '20px' }}
      pb={10}
      color="rgb(66, 203, 237)"
      textAlign="center"
    >
      {children}
    </Heading>
  )
})
