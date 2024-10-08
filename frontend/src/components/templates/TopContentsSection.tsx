import { Box, Stack, Text, Link, Button, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { memo, VFC } from 'react'
import { useUserAuth } from '../../hooks/queries/useUserAuth'
import { useControllModal } from '../../hooks/useControllModal'
import { PrimaryLargeButton } from '../atoms/button/PrimaryLargeButton'

export const TopContentsSection: VFC = memo(() => {
  const { onOpenUserAuthModal } = useControllModal()
  const { joinGuestUser } = useUserAuth()

  const router = useRouter()

  return (
    <Box pt="100px" textAlign="center">
      <Box
        bgImage="url('/images/top-image.jpg')"
        bgPos="center"
        bgSize="cover"
        h="800px"
      >
        <Heading
          pt={10}
          fontSize="35px"
          display={{ base: 'none', md: 'block' }}
        >
          チームを作って、トレーニングスケジュールを管理しよう。
        </Heading>
        <Heading
          px={2}
          pt={10}
          fontSize="25px"
          display={{ base: 'block', md: 'none' }}
        >
          チームを作って
          <br />
          トレーニングスケジュールを
          <br />
          管理しよう。
        </Heading>
        <Stack mt="50px">
          <PrimaryLargeButton
            name="login-modal"
            onClick={() => onOpenUserAuthModal(true)}
          >
            ログイン
          </PrimaryLargeButton>
          <Text fontSize="20px">または</Text>
          <PrimaryLargeButton
            name="signup-modal"
            onClick={() => onOpenUserAuthModal(false)}
          >
            新規登録
          </PrimaryLargeButton>
        </Stack>
        <Text mt="100px" fontSize="20px" mb={2}>
          お試しの使用はこちら
        </Text>
        <Button borderRadius="1000px" onClick={joinGuestUser} color="gray.500">
          ゲストとして参加
        </Button>
        <Box mt={{ base: '100px', md: '300px' }}>
          <Link
            onClick={() => router.push('/about')}
            color="orange"
            fontSize="25px"
          >
            トレサポとは？
          </Link>
        </Box>
      </Box>
    </Box>
  )
})
