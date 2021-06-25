import { memo, VFC } from 'react'
import { Heading, Link } from '@chakra-ui/layout'

import { HeaderLayout } from '../organisms/layout/HeaderLayout'

export const HeaderForGeneralUser: VFC = memo(() => {
    return (
        <HeaderLayout title='' isLogin={false}>
            <Heading as="h1" fontSize={{ base: "15px", md: "30px" }} onClick={() => null}>
               トレサポ
            </Heading>
            <Link onClick={() => null}>ログイン</Link>
        </HeaderLayout>
    )
})