import { memo, ReactNode, VFC } from 'react'
import { Button } from '@chakra-ui/react'

type Props = {
  onClick: () => void
  children: ReactNode
}

export const SecondaryButton: VFC<Props> = memo((props) => {
  const { onClick, children } = props
  return (
    <Button
      bg="white"
      borderRadius="lg"
      borderWidth="2px"
      borderColor="brand.500"
      color="brand.500"
      fontWeight="600"
      px={6}
      py={2}
      _hover={{
        bg: "brand.50",
        transform: "translateY(-2px)",
        boxShadow: "md",
      }}
      _active={{
        transform: "translateY(0)",
        boxShadow: "sm",
      }}
      transition="all 0.2s"
      onClick={onClick}
    >
      {children}
    </Button>
  )
})
