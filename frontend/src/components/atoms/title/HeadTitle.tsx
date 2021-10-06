import { memo, VFC } from "react";
import Head from 'next/head'

type Props = {
    title: string;
}

export const HeadTitle: VFC<Props> = memo((props) => {
    const { title } = props
    return (
        <Head>
            <title>トレサポ | {title}</title>
        </Head>
    )
})