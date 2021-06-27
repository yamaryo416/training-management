import { Box, Flex, Text } from '@chakra-ui/layout'
import { memo, ReactNode, VFC } from 'react'

import { PageTitle } from '../../atoms/title/PageTitle';
import { TutorialText } from '../../atoms/text/TutorialText'

type Props = {
    title: string;
    isLogin: boolean;
    children: ReactNode
}

export const HeaderLayout: VFC<Props> = memo((props) => {
    const { title, children, isLogin } = props;

    return (
        <Box pos="fixed" bg="gray.800" width="100%" height="80px" as="nav" zIndex="10">
            <Flex
                justify="space-between"
                align="center"
                wrap="wrap"
                bg="black"
                px={{ base: 5, md: 10 }}
                color="white"
                lineHeight="80px"
                fontSize={{ md: "16px"}}
            >
                {children}
            </Flex>
            <PageTitle>{title}</PageTitle>
            {isLogin && <TutorialText />}
        </Box>
    )
})
