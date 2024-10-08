import { memo, VFC } from 'react'
import { Heading, Link } from '@chakra-ui/react'

import { HeaderLayout } from '../organisms/layout/HeaderLayout'
import { useControllModal } from '../../hooks/useControllModal'
import { useRouter } from 'next/router'

export const HeaderForGeneralUser: VFC = memo(() => {
  const { onOpenUserAuthModal } = useControllModal()
  const router = useRouter()

  return (
    <HeaderLayout title="" isLogin={false}>
      <Heading
        as="h1"
        fontSize={{ base: '15px', md: '30px' }}
        onClick={() => router.push('/')}
      >
        トレサポ
      </Heading>
      <Link onClick={() => onOpenUserAuthModal(true)}>ログイン</Link>
    </HeaderLayout>
  )
})
