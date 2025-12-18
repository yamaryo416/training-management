import { memo, VFC } from 'react'
import { Box, IconButton, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure, VStack, HStack, Text, Divider } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

type MenuItem = {
  icon: any
  text: string
  onClick: () => void
}

type Props = {
  menuItems: MenuItem[]
  nickname: string
}

export const MobileMenu: VFC<Props> = memo((props) => {
  const { menuItems, nickname } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        aria-label="Open menu"
        icon={<FontAwesomeIcon icon={faBars} />}
        onClick={onOpen}
        bg="transparent"
        color="gray.700"
        _hover={{ bg: 'gray.100' }}
        size="lg"
      />
      
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <DrawerContent bg="white" borderLeftRadius="2xl">
          <DrawerCloseButton color="gray.600" />
          <DrawerHeader borderBottomWidth="1px" borderColor="gray.100">
            <VStack align="start" spacing={2}>
              <Text fontSize="sm" color="gray.500">ようこそ</Text>
              <Text fontSize="lg" fontWeight="700" color="gray.800">{nickname}</Text>
            </VStack>
          </DrawerHeader>
          
          <DrawerBody pt={6}>
            <VStack spacing={2} align="stretch">
              {menuItems.map((item, index) => (
                <Box key={index}>
                  {item.text === 'divider' ? (
                    <Divider my={2} borderColor="gray.200" />
                  ) : (
                    <Box
                      as={motion.div}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        item.onClick()
                        onClose()
                      }}
                      p={4}
                      borderRadius="lg"
                      cursor="pointer"
                      transition="all 0.2s"
                      _hover={{ bg: 'orange.50', color: 'brand.600' }}
                    >
                      <HStack spacing={4}>
                        <Box w={6} textAlign="center" color="brand.500">
                          <FontAwesomeIcon icon={item.icon} />
                        </Box>
                        <Text fontWeight="500">{item.text}</Text>
                      </HStack>
                    </Box>
                  )}
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
})