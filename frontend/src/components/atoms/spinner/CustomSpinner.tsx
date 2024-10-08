import { memo, VFC } from 'react'
import { Center, Spinner } from '@chakra-ui/react'

export const CustomSpinner: VFC = memo(() => {
  return (
    <Center>
      <Spinner />
    </Center>
  )
})
