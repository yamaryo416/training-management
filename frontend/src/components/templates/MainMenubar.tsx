import { useCallback, useState, VFC } from "react"
import { Box, Flex } from "@chakra-ui/layout"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import DnsIcon from '@material-ui/icons/Dns';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useRouter } from "next/router"

import { useControllModal } from "../../hooks/useControllModal";
import { MenuButton } from "../molecules/MenuButton";
import { useUserAuth } from "../../hooks/queries/useUserAuth";
import { useDeleteMyAccount } from "../../hooks/queries/useDeleteMyAccount";
import { useRecoilValue } from "recoil";

type Props = {
    isJoinTeam: boolean;
    isCoach: boolean;
    isMyTeamPage: boolean;
    isGuest: boolean;
}

export const MainMenubar:VFC<Props> = (props) => {
    const { isJoinTeam , isCoach, isMyTeamPage, isGuest } = props;

    const router = useRouter()
    const { logout } = useUserAuth()
    const { deleteUser } = useDeleteMyAccount()

    const [isMenubarOpen, setIsMenubarOpen] = useState(true)
    const [menuFocus, setMenuFocus] = useState<false | "pageList" | "myMenuList">(false)

   const {
       onOpenTeamAuthModal,
       onOpenTrainingCreateModal,
       onOpenScheduleCreateModal,
       onOpenScheduleDeleteModal,
       onOpenMyProfileEditModal,
       onOpenTeamEditModal
   } = useControllModal()

   const onOpenIsMenubar = useCallback(() => setIsMenubarOpen(true), [])
   const onCloseIsMenubar = useCallback(() => setIsMenubarOpen(false), [])
   const onFocusPageList = useCallback(() => setMenuFocus("pageList"), [])
   const onFocusMyMenuList = useCallback(() => setMenuFocus("myMenuList"), [])
   const onCloseMenuFocus = useCallback(() => setMenuFocus(false), [])

    return (
        <>
            {isMenubarOpen ? (
                <>
                    <Box
                        pos="fixed"
                        top="80px"
                        h="100vh"
                        borderRightColor="gray.500"
                        borderRightStyle="solid"
                        borderRightWidth="1px"
                        display={{ base: "none", md: "block" }}
                    >
                        <Flex justify="space-between">
                            <Box mt='50px'>
                                <MenuButton title="メニュー" onClick={() => menuFocus === "myMenuList" ? onCloseMenuFocus() : onFocusMyMenuList()  }>
                                    <MenuIcon style={{ fontSize: 40 }} data-testid='main-my-menu-icon' />
                                </MenuButton>
                                {menuFocus === "myMenuList" && (
                                    <Box
                                        borderY="3px double #718096"
                                    >
                                        {!isGuest && (
                                            <MenuButton title="プロフィール編集" onClick={onOpenMyProfileEditModal}>
                                                <EditIcon style={{ fontSize: 40 }} data-testid='main-profile-edit-icon' />
                                            </MenuButton>
                                        )}
                                        {!isJoinTeam && (
                                            <>
                                                {!isGuest && (
                                                    <MenuButton title="チーム作成" onClick={() => onOpenTeamAuthModal(false)}>
                                                        <GroupIcon style={{ fontSize: 40 }} data-testid='main-create-team-icon' />
                                                    </MenuButton>
                                                )}
                                                <MenuButton title="チーム加入" onClick={() => onOpenTeamAuthModal(true)}>
                                                    <GroupIcon style={{ fontSize: 40 }} data-testid='main-join-team-icon' />
                                                </MenuButton>
                                            </>
                                        )}
                                        {isMyTeamPage && isCoach && (
                                            <>
                                                <MenuButton title="チーム編集" onClick={onOpenTeamEditModal}>
                                                    <EditIcon style={{ fontSize: 40 }} data-testid='main-my-team-edit-icon' />
                                                </MenuButton>
                                                <MenuButton title="トレーニング作成" onClick={onOpenTrainingCreateModal}>
                                                    <NoteAddIcon style={{ fontSize: 40 }} data-testid='main-create-training-icon' />
                                                </MenuButton>
                                                <MenuButton title="スケジュール作成" onClick={onOpenScheduleCreateModal}>
                                                    <InsertInvitationIcon style={{ fontSize: 40}} data-testid='main-create-schedule-icon' />
                                                </MenuButton>
                                                <MenuButton title="スケジュール削除" onClick={onOpenScheduleDeleteModal}>
                                                    <DeleteForeverIcon style={{ fontSize: 40 }} data-testid='main-delete-schedule-icon' />
                                                </MenuButton>
                                            </>
                                        )}
                                        <MenuButton
                                            title={isGuest ? 'アカウント削除' : "ログアウト"}
                                            onClick={isGuest ? deleteUser : logout}
                                        >
                                            <ExitToAppIcon style={{ fontSize: 40}} data-testid='main-logout-icon' />
                                        </MenuButton>
                                    </Box>
                                )}
                                <MenuButton
                                    title="ページ移動"
                                    onClick={
                                        () => menuFocus === "pageList" ? onCloseMenuFocus() : onFocusPageList()
                                }>
                                    <FindInPageIcon style={{ fontSize: 40 }} data-testid='main-move-page-icon' />
                                </MenuButton>
                                {menuFocus === "pageList" && (
                                    <Box
                                        borderY="1px solid #718096"
                                    >
                                        {isJoinTeam && (
                                            <MenuButton title="マイページ" onClick={() => router.push("/main")}>
                                                    <HomeIcon style={{ fontSize: 40}} data-testid='main-move-my-page-icon' />
                                            </MenuButton>
                                        )}
                                        {isCoach && (
                                            <MenuButton title="マイチームメンバー" onClick={() => null}>
                                                <DnsIcon style={{ fontSize: 40 }} data-testid='main-move-my-team-member-icon' />
                                            </MenuButton>
                                        )}
                                        <MenuButton title="チームリスト" onClick={() => router.push("/teams")}>
                                            <DnsIcon style={{ fontSize: 40}} data-testid='main-move-other-teams-icon' />
                                        </MenuButton>

                                    </Box>
                                )}
                            </Box>
                            <ArrowBackIosIcon 
                                style={{
                                    display: "block",
                                    height: "90vh",
                                    verticalAlign: "middle",
                                    marginLeft: "10px"
                                }}
                                onClick={() => {
                                    onCloseMenuFocus()
                                    onCloseIsMenubar()
                                }} />
                        </Flex>
                    </Box>
                    <Box width="300px" display={{ base: "none", md: "block" }}></Box>
                </>
            ): (
                <>
                    <Box
                        pos="fixed"
                        top="80px"
                        h="100vh"
                        borderRightColor="gray.500"
                        borderRightStyle="solid"
                        borderRightWidth="1px"
                        display={{ base: "none", md: "block" }}
                    >
                        <NavigateNextIcon
                            style={{
                                display: "block",
                                height: "90vh",
                                verticalAlign: "middle",
                                fontSize: "40px"
                            }}
                            onClick={onOpenIsMenubar}
                        />
                    </Box>
                    <Box width="100px" display={{ base: "none", md: "block" }}></Box>
                </>
            )}
        </>
    )
}