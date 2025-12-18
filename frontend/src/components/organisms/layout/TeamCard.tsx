import { memo, VFC } from 'react'
import { Box, Stack, Text, Image, Badge, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons'

type Props = {
  teamId: string
  teamName: string
  coachName: string
  introduction: string
  joinCount: number
}

export const TeamCard: VFC<Props> = memo((props) => {
  const { teamId, teamName, coachName, introduction, joinCount } = props

  const router = useRouter()

  return (
    <Box
      as={motion.div}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      w="300px"
      p={0}
      ml={{ base: '20px', md: '0px' }}
      mr={{ base: '0px', md: '20px' }}
      mb="30px"
      borderRadius="2xl"
      bg="white"
      boxShadow="lg"
      overflow="hidden"
      cursor="pointer"
      position="relative"
      _hover={{
        boxShadow: '2xl',
      }}
      onClick={async () => {
        router.push(`/teams/${teamId}`)
      }}
    >
      <Box
        h="5px"
        bgGradient="linear(to-r, brand.400, orange.300)"
      />
      <Stack spacing={6} p={6}>
        <Box textAlign="center">
          <Text
            fontSize="xl"
            fontWeight="700"
            color="gray.800"
            data-testId={`${teamId}-team-name`}
            mb={2}
          >
            {teamName}
          </Text>
          <Badge
            colorScheme="orange"
            fontSize="sm"
            px={3}
            py={1}
            borderRadius="full"
          >
            アクティブ
          </Badge>
        </Box>
        
        <Box position="relative">
          <Box
            position="absolute"
            inset="-10px"
            bgGradient="radial(brand.200, transparent)"
            opacity="0.3"
            borderRadius="full"
            filter="blur(20px)"
          />
          <Image
            borderRadius="full"
            boxSize="120px"
            src="/images/team.jpg"
            alt="チーム画像"
            mx="auto"
            border="4px solid"
            borderColor="white"
            boxShadow="lg"
          />
        </Box>
        
        <Stack spacing={3}>
          <HStack
            spacing={2}
            color="gray.600"
            data-testId={`${teamId}-team-coach`}
          >
            <FontAwesomeIcon icon={faUserTie} />
            <Text fontSize="sm" fontWeight="500">
              コーチ: {coachName}
            </Text>
          </HStack>
          
          <HStack
            spacing={2}
            color="gray.600"
            data-testId={`${teamId}-team-join-count`}
          >
            <FontAwesomeIcon icon={faUsers} />
            <Text fontSize="sm" fontWeight="500">
              チーム人数: {joinCount}人
            </Text>
          </HStack>
        </Stack>
        
        <Box
          bg="gray.50"
          p={4}
          borderRadius="lg"
          minH="80px"
        >
          <Text fontSize="xs" fontWeight="600" color="gray.500" mb={1}>
            紹介文
          </Text>
          <Text fontSize="sm" color="gray.700" noOfLines={3}>
            {introduction ? introduction : '記載なし'}
          </Text>
        </Box>
      </Stack>
    </Box>
  )
})
