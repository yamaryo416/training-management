import { memo, ReactNode, VFC } from 'react'
import { Button } from '@chakra-ui/react'

type Props = {
  name: string
  type: 'button' | 'submit'
  disabled: boolean
  onClick: () => void | null
  children: ReactNode
}

export const PrimaryButton: VFC<Props> = memo((props) => {
  const { name, type, disabled, onClick, children } = props
  return (
    <Button
      disabled={disabled}
      type={type}
      bg="brand.500"
      bgGradient="linear(to-r, brand.500, orange.400)"
      borderRadius="lg"
      px={6}
      py={2}
      color="white"
      fontWeight="600"
      boxShadow="md"
      data-testid={name + '-button'}
      onClick={onClick}
      _hover={{
        bgGradient: "linear(to-r, brand.600, orange.500)",
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
      _active={{
        transform: "translateY(0)",
        boxShadow: "md",
      }}
      _disabled={{
        opacity: 0.6,
        cursor: "not-allowed",
        _hover: {
          transform: "none",
          boxShadow: "md",
        }
      }}
      transition="all 0.2s"
    >
      {children}
    </Button>
  )
})
