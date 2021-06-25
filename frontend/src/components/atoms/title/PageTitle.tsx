import { memo, ReactNode, VFC } from "react";
import { Heading } from "@chakra-ui/layout";

type Props = {
    children: ReactNode;
}

export const PageTitle: VFC<Props> = memo((props) => {
    const { children } = props;

    return (
        <Heading
            fontSize={{ base: "16px", md: "25px"}}
            textAlign='center'
            pb={5}
            bg='black'
            data-testid='page-title'
        >
            {children}
        </Heading>
    )
})