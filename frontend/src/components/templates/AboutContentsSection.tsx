import { memo, VFC } from "react";
import { Box, Stack, Text, Link, Heading } from "@chakra-ui/layout";
import { Image } from '@chakra-ui/image';
import { Center } from "@chakra-ui/react";

export const AboutContentsSection: VFC = memo(() => {
    return (
        <Box textAlign='center' color='white' pt='100px'>
            <Box
               bgImage="url('/images/top-image.jpg')"
               bgPos='center'
               bgSize='cover'
               h='100px' 
            >
                <Heading pt={7}>トレサポとは？</Heading>
            </Box>
            <Box fontSize={{ base: '18px', md: '20px' }} mt={5}>
                <Text display={{ base: 'none', md: 'block' }}>チームを作り、トレーニングスケジュールを作ることで、</Text>
                <Text display={{ base: 'block', md: 'none' }}>チームを作り、<br/>トレーニングスケジュールを作ることで、</Text>
                <Text display={{ base: 'none', md: 'block' }}>チームメンバーとスケジュールを共有することができます。</Text>
                <Text display={{ base: 'block', md: 'none' }}>チームメンバーとスケジュールを<br/>共有することができます。</Text>
                <Center my={10}>
                    <Image
                        src='/images/about-image1.png'
                    />
                </Center>
                <Text display={{ base: 'none', md: 'block' }}>また、スケジュールを実施した際に、『実施する』ボタンを押すことで、記録を残すことができます。</Text>
                <Text display={{ base: 'block', md: 'none' }}>また、スケジュールを実施した際に、<br/>『実施する』ボタンを押すことで、<br/>記録を残すことができます。</Text>
                <Center my={10}>
                    <Image
                        src='/images/about-image2.png'
                    />
                </Center>
                <Text display={{ base: 'none', md: 'block' }}>スケジュールごとに実施したメンバーを確認できます。</Text>
                <Text display={{ base: 'block', md: 'none' }}>スケジュールごとに<br/>実施したメンバーを確認できます。</Text>
                <Center my={10}>
                    <Image
                        src='/images/about-image3.png'
                    />
                </Center>
                <Text>トレーニングを今までどれくらい実施したか確認もできます。</Text>
                <Center my={10}>
                    <Image
                        src='/images/about-image4.png'
                    />
                </Center>
                <Box textAlign={{ base: 'left', md: 'center' }} mx={2}>
                    <Text mb={5}>このアプリは以下のような使い方ができます。</Text>
                    <Text>・個人で、日々のトレーニングの記録として</Text>
                    <Text>・チームのコーチで、メンバーのスケジュール実施状況を確認するツールとして</Text>
                    <Text>・マンツーマンで、スケジュールを管理するツールとして</Text>
                </Box>
            </Box>
        </Box>
    )
})