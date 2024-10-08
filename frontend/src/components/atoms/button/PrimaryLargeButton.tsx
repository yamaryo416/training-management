import { memo, ReactNode, VFC } from 'react'
import { Box, Button } from '@chakra-ui/react'

type Props = {
  name: string
  onClick: () => void | null
  children: ReactNode
}

export const PrimaryLargeButton: VFC<Props> = memo((props) => {
  const { name, onClick, children } = props
  return (
    <Box>
      <Button
        bg="blue.500"
        borderRadius="1000px"
        p={5}
        color="white"
        data-testid={name + '-button'}
        onClick={onClick}
        fontSize="23px"
      >
        {children}
      </Button>
    </Box>
  )
})
