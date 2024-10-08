import { useCallback, useState, VFC } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useControllModal } from '../../hooks/useControllModal'
import { MenuButton } from '../molecules/MenuButton'
import { useUserAuth } from '../../hooks/queries/useUserAuth'
import { useDeleteMyAccount } from '../../hooks/queries/useDeleteMyAccount'
import { useRecoilValue } from 'recoil'
import { tutorialState } from '../../store/tutorialState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faBars,
  faCalendar,
  faChevronLeft,
  faChevronRight,
  faHouse,
  faList,
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
  faTrash,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

type Props = {
  isJoinTeam: boolean
  isCoach: boolean
  isMyTeamPage: boolean
  isGuest: boolean
}

export const MainMenubar: VFC<Props> = (props) => {
  const { isJoinTeam, isCoach, isMyTeamPage, isGuest } = props

  const router = useRouter()
  const { logout } = useUserAuth()
  const { deleteUser } = useDeleteMyAccount()
  const tutorial = useRecoilValue(tutorialState)

  const [isMenubarOpen, setIsMenubarOpen] = useState(true)
  const [menuFocus, setMenuFocus] = useState<false | 'pageList' | 'myMenuList'>(
    false
  )

  const {
    onOpenTeamAuthModal,
    onOpenTrainingCreateModal,
    onOpenScheduleCreateModal,
    onOpenScheduleDeleteModal,
    onOpenMyProfileEditModal,
    onOpenTeamEditModal,
  } = useControllModal()

  const onOpenIsMenubar = useCallback(() => setIsMenubarOpen(true), [])
  const onCloseIsMenubar = useCallback(() => setIsMenubarOpen(false), [])
  const onFocusPageList = useCallback(() => setMenuFocus('pageList'), [])
  const onFocusMyMenuList = useCallback(() => setMenuFocus('myMenuList'), [])
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
            display={{ base: 'none', md: 'block' }}
          >
            <Flex justify="space-between">
              <Box mt={tutorial === 0 ? '50px' : '130px'}>
                <MenuButton
                  title="メニュー"
                  onClick={() =>
                    menuFocus === 'myMenuList'
                      ? onCloseMenuFocus()
                      : onFocusMyMenuList()
                  }
                >
                  <FontAwesomeIcon
                    icon={faBars}
                    style={{ fontSize: '40px' }}
                    data-testid="main-my-menu-icon"
                  />
                </MenuButton>
                {menuFocus === 'myMenuList' && (
                  <Box borderY="3px double #718096">
                    {!isGuest && (
                      <MenuButton
                        title="プロフィール編集"
                        onClick={onOpenMyProfileEditModal}
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ fontSize: '40px' }}
                          data-testid="main-profile-edit-icon"
                        />
                      </MenuButton>
                    )}
                    {!isJoinTeam && (
                      <>
                        {!isGuest && (
                          <MenuButton
                            title="チーム作成"
                            onClick={() => onOpenTeamAuthModal(false)}
                          >
                            <FontAwesomeIcon
                              icon={faUsers}
                              style={{ fontSize: '40px' }}
                              data-testid="main-create-team-icon"
                            />
                          </MenuButton>
                        )}
                        <MenuButton
                          title="チーム加入"
                          onClick={() => onOpenTeamAuthModal(true)}
                        >
                          <FontAwesomeIcon
                            icon={faUsers}
                            style={{ fontSize: '40px' }}
                            data-testid="main-join-team-icon"
                          />
                        </MenuButton>
                      </>
                    )}
                    {isMyTeamPage && isCoach && (
                      <>
                        <MenuButton
                          title="チーム編集"
                          onClick={onOpenTeamEditModal}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{ fontSize: '40px' }}
                            data-testid="main-my-team-edit-icon"
                          />
                        </MenuButton>
                        <MenuButton
                          title="トレーニング作成"
                          onClick={onOpenTrainingCreateModal}
                        >
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ fontSize: 40 }}
                            data-testid="main-create-training-icon"
                          />
                        </MenuButton>
                        <MenuButton
                          title="スケジュール作成"
                          onClick={onOpenScheduleCreateModal}
                        >
                          <FontAwesomeIcon
                            icon={faCalendar}
                            style={{ fontSize: 40 }}
                            data-testid="main-create-schedule-icon"
                          />
                        </MenuButton>
                        <MenuButton
                          title="スケジュール削除"
                          onClick={onOpenScheduleDeleteModal}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ fontSize: '40px' }}
                            data-testid="main-delete-schedule-icon"
                          />
                        </MenuButton>
                      </>
                    )}
                    <MenuButton
                      title={isGuest ? 'アカウント削除' : 'ログアウト'}
                      onClick={isGuest ? deleteUser : logout}
                    >
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        style={{ fontSize: '40px' }}
                        data-testid="main-logout-icon"
                      />
                    </MenuButton>
                  </Box>
                )}
                <MenuButton
                  title="ページ移動"
                  onClick={() =>
                    menuFocus === 'pageList'
                      ? onCloseMenuFocus()
                      : onFocusPageList()
                  }
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ fontSize: '40px' }}
                    data-testid="main-move-page-icon"
                  />
                </MenuButton>
                {menuFocus === 'pageList' && (
                  <Box borderY="1px solid #718096">
                    {isJoinTeam && (
                      <MenuButton
                        title="マイページ"
                        onClick={() => router.push('/main')}
                      >
                        <FontAwesomeIcon
                          icon={faHouse}
                          style={{ fontSize: 40 }}
                          data-testid="main-move-my-page-icon"
                        />
                      </MenuButton>
                    )}
                    {isCoach && (
                      <MenuButton
                        title="マイチームメンバー"
                        onClick={() => router.push('/my-team-member')}
                      >
                        <FontAwesomeIcon
                          icon={faList}
                          style={{ fontSize: '40px' }}
                          data-testid="main-move-my-team-member-icon"
                        />
                      </MenuButton>
                    )}
                    <MenuButton
                      title="チームリスト"
                      onClick={() => router.push('/teams')}
                    >
                      <FontAwesomeIcon
                        icon={faList}
                        style={{ fontSize: '40px' }}
                        data-testid="main-move-my-team-member-icon"
                      />
                    </MenuButton>
                  </Box>
                )}
              </Box>
              <Box
                height="90vh"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  style={{
                    display: 'block',
                    verticalAlign: 'middle',
                    marginLeft: '10px',
                    marginRight: '10px',
                  }}
                  onClick={() => {
                    onCloseMenuFocus()
                    onCloseIsMenubar()
                  }}
                />
              </Box>
            </Flex>
          </Box>
          <Box width="300px" display={{ base: 'none', md: 'block' }}></Box>
        </>
      ) : (
        <>
          <Box
            pos="fixed"
            top="80px"
            h="100vh"
            borderRightColor="gray.500"
            borderRightStyle="solid"
            borderRightWidth="1px"
            display={{ base: 'none', md: 'block' }}
          >
            <Box
              height="90vh"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{
                  display: 'block',
                  marginLeft: '10px',
                  marginRight: '10px',
                }}
                onClick={onOpenIsMenubar}
              />
            </Box>
          </Box>
          <Box width="100px" display={{ base: 'none', md: 'block' }}></Box>
        </>
      )}
    </>
  )
}
