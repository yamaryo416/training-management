import { memo, useCallback, useState, VFC } from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu';
import GroupIcon from '@material-ui/icons/Group';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import MenuIcon from '@material-ui/icons/Menu';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HomeIcon from '@material-ui/icons/Home';
import DnsIcon from '@material-ui/icons/Dns';
import { Image } from '@chakra-ui/image';
import { useRouter } from "next/router"

import { HeaderLayout } from '../organisms/layout/HeaderLayout'
import { useUserAuth } from '../../hooks/queries/useUserAuth';
import { useControllModal } from '../../hooks/useControllModal';
import { TeamBoardType } from '../../../types/queriesType';
import { MenuListItem } from '../molecules/MenuListItem';
import { useDeleteMyAccount } from '../../hooks/queries/useDeleteMyAccount';

type Props = {
    title: string;
    nickname: string;
    myTeamBoard: TeamBoardType | undefined ;
    isMyTeamPage: boolean;
    isCoach: boolean;
    isGuest: boolean;
}

export const HeaderForAuthUser: VFC<Props> = memo((props) => {
    const { title, nickname, myTeamBoard, isMyTeamPage, isCoach, isGuest } = props;

    const [menuFocus, setMenuFocus] = useState<false | "pageList" | "myMenuList">(false)

    const router = useRouter()
    const { logout } = useUserAuth()
    const { deleteUser } = useDeleteMyAccount()
    const {
        onOpenTeamAuthModal,
        onOpenTrainingCreateModal,
        onOpenScheduleCreateModal,
        onOpenScheduleDeleteModal,
        onOpenMyProfileEditModal,
        onOpenTeamEditModal
    } = useControllModal()

    const onFocusPageList = useCallback(() => setMenuFocus("pageList"), [])
    const onFocusMyMenuList = useCallback(() => setMenuFocus("myMenuList"), [])
    const onCloseMenuFocus = useCallback(() => setMenuFocus(false), [])

    return (
        <HeaderLayout
            isLogin={true}
            title={title}
        >
            <Box
                onClick={() => myTeamBoard ? router.push("/main") : null}
            >
                <Flex alignItems="center">
                    <Image
                        borderRadius="full"
                        boxSize="50px"
                        src="/images/team.jpg"
                        alt="???????????????"
                    />
                    <Heading as="h1" ml={2} fontSize={{ base: "15px", md: "30px" }} data-testid='my-team-name'>{myTeamBoard ? myTeamBoard.team.name : "?????????"}</Heading>
                </Flex>
            </Box>
            <Menu>
                <MenuButton>
                    <Box display={{ base: "none", md: "block" }}>
                        <Flex alignItems="center">
                            <AccountCircleIcon style={{ fontSize: 50 }} />
                            <Text pl={3} data-testid='my-nickname'>{nickname}</Text>
                        </Flex>
                    </Box>
                    <Box display={{ base: "block", md:"none"}}>
                        <MenuIcon />
                    </Box>
                </MenuButton>
                <MenuList color="black">
                    <Box display={{ base: "block", md: "none" }} borderBottom="1px solid #718096" mx={2} lineHeight="40px">
                        <Flex alignItems="center">
                            <AccountCircleIcon style={{ fontSize: 40 }} />
                            <Text pl={1} color="black">{nickname}</Text>
                        </Flex>
                    </Box>
                    <Box mx={6}>
                        <MenuListItem
                            text="????????????"
                            onClick={() => menuFocus === "myMenuList" ? onCloseMenuFocus() : onFocusMyMenuList()}
                        >
                            <MenuIcon />
                        </MenuListItem>
                        {menuFocus === "myMenuList" && (
                            <Box ml={10}>
                                {!isGuest && (
                                    <MenuListItem
                                        text="????????????????????????"
                                        onClick={onOpenMyProfileEditModal}
                                    >
                                        <EditIcon />
                                    </MenuListItem>
                                )}
                                {!myTeamBoard && (
                                    <>
                                        {!isGuest && (
                                            <MenuListItem
                                                text="???????????????"
                                                onClick={() => onOpenTeamAuthModal(false)}
                                            >
                                                <GroupIcon />
                                            </MenuListItem>
                                        )}
                                        <MenuListItem
                                            text="???????????????"
                                            onClick={() => onOpenTeamAuthModal(true)}
                                        >
                                            <GroupIcon />
                                        </MenuListItem>
                                    </>
                                )}
                                {isCoach && isMyTeamPage && (
                                    <>
                                        <MenuListItem
                                            text="???????????????"
                                            onClick={onOpenTeamEditModal}
                                        >
                                            <EditIcon />
                                        </MenuListItem>
                                        <MenuListItem
                                            text="????????????????????????"
                                            onClick={onOpenTrainingCreateModal}
                                        >
                                           <NoteAddIcon />
                                        </MenuListItem>
                                        <MenuListItem
                                            text="????????????????????????"
                                            onClick={onOpenScheduleCreateModal}
                                        >
                                           <NoteAddIcon />
                                        </MenuListItem>
                                        <MenuListItem
                                            text="????????????????????????"
                                            onClick={onOpenScheduleDeleteModal}
                                        >
                                            <DeleteForeverIcon />
                                        </MenuListItem>
                                    </>
                                )}
                                 <MenuListItem
                                    text={isGuest ? '?????????????????????' : "???????????????"}
                                    onClick={isGuest ? deleteUser : logout }
                                >
                                    <ExitToAppIcon />
                                </MenuListItem>
                            </Box>
                        )}
                        <MenuListItem
                            text="???????????????"
                            onClick={() => menuFocus === "pageList" ? onCloseMenuFocus() : onFocusPageList()}
                        >
                             <FindInPageIcon />
                        </MenuListItem>
                        {menuFocus === "pageList" && (
                            <Box ml={10}>
                                {myTeamBoard && (
                                    <MenuListItem
                                        text="???????????????"
                                        onClick={() => router.push("/main")}
                                    >
                                        <HomeIcon />
                                    </MenuListItem>
                                )}
                                {isCoach && (
                                    <MenuListItem
                                        text="???????????????????????????"
                                        onClick={() => router.push("/my-team-member")}
                                        >
                                        <DnsIcon />
                                    </MenuListItem>
                                )}
                                <MenuListItem
                                    text="??????????????????"
                                    onClick={() => router.push("/teams")}
                                >
                                    <DnsIcon />
                                </MenuListItem>
                            </Box>
                        )}
                    </Box>  
                </MenuList>
            </Menu>
        </HeaderLayout>
    )
})
