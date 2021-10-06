import { memo, ReactNode, VFC } from "react"
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button"

type Props = {
    name: string;
    onClick: () => void | null;
    children: ReactNode;
}

export const PrimaryLargeButton: VFC<Props> = memo((props) => {
    const { name, onClick, children } = props
    return (
        <Box>
            <Button
                bg="blue.500"
                borderRadius="1000px"
                p={5}
                color="white"
                data-testid={name + '-button'}
                onClick={onClick}
                fontSize='23px'
            >
                {children}
            </Button>
        </Box>
    )
})
