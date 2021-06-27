import { Text, Box, Flex } from "@chakra-ui/react";
import { VFC } from "react";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { tutorialState } from "../../../store/tutorialState";

export const TutorialText: VFC = memo(() => {
    const tutorial = useRecoilValue(tutorialState)

    if (tutorial === 0) return null

    switch (tutorial) {
        case 1:
            return (
                <>
                    <Box textAlign='center' display={{ base: 'none', md: 'block'}} bg='black' >
                        <Text mb={3}　fontSize='18px'>
                            ステップ１: チームを作成、または加入しよう！<br/>
                        </Text>
                        <Text fontSize='15px'>
                            チーム作成：右上の『ユーザー名』→『メニュー』 → 『チーム作成』<br/>
                            チーム加入: チームリストにて『チームをタップ』→『チームに加入する』
                        </Text>
                    </Box>
                    <Box display={{ base: 'bock', md: 'none'}} bg='black'>
                        <Text mb={3} ml={3} fontSize='15px'>
                            まずはチームを作成、または加入しましょう！<br/>
                        </Text>
                        <Flex justify='space-around' fontSize='13px'>
                            <Box textAlign="center">
                                <Text borderBottom='3px double white' mb={2}>チーム作成</Text>
                                <Text>『右上のメニューボタン』</Text>
                                <Text>↓</Text>
                                <Text>『メニュー』</Text>
                                <Text>↓</Text>
                                <Text>チーム作成』</Text>
                            </Box>
                            <Box textAlign='center'>
                                <Text borderBottom='3px double white' mb={2}>チーム加入</Text>
                                <Text>チームリストにて</Text>
                                <Text>『チームをタップ』</Text>
                                <Text>↓</Text>
                                <Text>『チームに加入する』</Text>
                            </Box>
                        </Flex>
                    </Box>
                </>
            )

        case 2:
            return (
                <>
                    <Box fontSize='18px' textAlign='center' display={{ base: 'none', md: 'block'}} bg='black' >
                        <Text mb={3}>
                            ステップ１: チームに加入しよう！
                        </Text>
                        <Text fontSize='15px'>
                            チームリストにて『チームをタップ』→『チームに加入する』
                        </Text>
                    </Box>
                    <Box display={{ base: 'bock', md: 'none'}} bg='black'>
                        <Text mb={3} ml={3} fontSize='15px'>
                            ステップ1: チームに加入しよう!<br/>
                        </Text>
                        <Box textAlign='center' fontSize='13px'>
                            <Text>チームリストにて</Text>
                            <Text>『チームをタップ』</Text>
                            <Text>↓</Text>
                            <Text>『チームに加入する』</Text>
                        </Box>
                    </Box>
                </>
            )

        case 3:
            return (
                <>
                    <Box fontSize='18px' textAlign='center' display={{ base: 'none', md: 'block'}} bg='black' >
                        <Text mb={3}>
                            ステップ2: トレーニングを作成しよう！
                        </Text>
                        <Text>
                            右上の『ユーザー名』→『メニュー』 →『トレーニング作成』<br/>
                        </Text>
                    </Box>
                    <Box display={{ base: 'bock', md: 'none'}} bg='black'>
                        <Text mb={3} ml={3} textAlign="center" fontSize='15px'>
                            ステップ2: トレーニングを作成しよう！
                        </Text>
                        <Box textAlign="center" fontSize='13px'>
                            <Text>『右上のメニューボタン』</Text>
                            <Text>↓</Text>
                            <Text>『メニュー』</Text>
                            <Text>↓</Text>
                            <Text>『トレーニング作成』</Text>
                        </Box>
                    </Box>
                </>
            )

        case 4:
            return (
                <>
                    <Box fontSize='18px' textAlign='center' display={{ base: 'none', md: 'block'}} bg='black' >
                        <Text mb={3}>
                            ステップ3: スケジュールを作成しよう！
                        </Text>
                        <Text>
                            右上の『ユーザー名』→『メニュー』 →『スケジュール作成』<br/>
                        </Text>
                    </Box>
                    <Box display={{ base: 'bock', md: 'none'}} bg='black'>
                        <Text mb={3} ml={3} textAlign="center" fontSize='15px'>
                            ステップ3: スケジュールを作成しよう！
                        </Text>
                        <Box textAlign="center" fontSize='13px'>
                            <Text>『右上のメニューボタン』</Text>
                            <Text>↓</Text>
                            <Text>『メニュー』</Text>
                            <Text>↓</Text>
                            <Text>『スケジュール作成』</Text>
                        </Box>
                    </Box>
                </>
            )

        case 5:
            return (
                <>
                    <Box fontSize='18px' textAlign='center' display={{ base: 'none', md: 'block'}} bg='black' >
                        <Text mb={3}>
                            ステップ2: スケジュールを実施しよう!
                        </Text>
                        <Text>
                            マイページにて今日の予定にスケジュールがある場合は、『実施する』ボタンを押して、スケジュールを実施しよう！
                        </Text>
                    </Box>
                    <Box display={{ base: 'bock', md: 'none'}} bg='black'>
                        <Text mb={3} ml={3} textAlign="center" fontSize='15px'>
                            ステップ2: スケジュールを実施しよう!
                        </Text>
                        <Box textAlign="center" fontSize='13px'>
                            <Text>マイページにて</Text>
                            <Text>今日の予定にスケジュールがある場合</Text>
                            <Text>『実施する』ボタンをタップ</Text>
                        </Box>
                    </Box>
                </>
            )
        
        case 6:
            return (
                <>
                    <Box fontSize='18px' textAlign='center' display={{ base: 'none', md: 'block'}} bg='black' >
                        <Text mb={3}>
                           ゲストユーザーの場合はスケジュールの閲覧のみ可能です。
                        </Text>
                    </Box>
                    <Box display={{ base: 'bock', md: 'none'}} bg='black'>
                        <Text mb={3} ml={3} textAlign="center" fontSize='15px'>
                            ゲストユーザーの場合はスケジュールの閲覧のみ可能です。
                        </Text>
                    </Box>
                </>
            )
    }
})