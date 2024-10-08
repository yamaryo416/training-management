import 'moment/locale/ja'

import { memo, useCallback, VFC } from 'react'
import { Button, Input, Box, Flex, Text, Spinner } from '@chakra-ui/react'

import { SpeechBallon } from '../../molecules/SpeechBallown'
import { useCreatePost } from '../../../hooks/queries/useCreatePost'
import { useGetMoreMyTeamPosts } from '../../../hooks/queries/useGetMoreMyTeamPosts'
import { NUM_PAGE } from '../../../../constants'
import { MyTeamPostsType } from '../../../../types/queriesType'
import { useGetMyProfile } from '../../../hooks/queries/useGetMyProfile'
import { SectionTitle } from '../../atoms/title/SectionTitle'
import { useControllModal } from '../../../hooks/useControllModal'
import { PostMemberItem } from '../../molecules/PostMemberItem'
import { FailedText } from '../../atoms/text/FailedText'
import { FetchMoreLink } from '../../atoms/link/FetchMoreLink'
import { SectionCloseLink } from '../../atoms/link/SectionCloseLink'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

export const TeamBoardPost: VFC = memo(() => {
  moment.locale('ja')

  const { dataMyProfile } = useGetMyProfile()
  const {
    loadingMoreMyTeamPosts,
    dataMoreMyTeamPosts,
    errorMoreMyTeamPosts,
    fetchMore,
  } = useGetMoreMyTeamPosts()

  const { onOpenConfirmPostDeleteModal } = useControllModal()
  const { text, onChangeText, createPost } = useCreatePost()

  const fetchMorePost = useCallback(
    () =>
      fetchMore({
        variables: {
          first: NUM_PAGE,
          after: dataMoreMyTeamPosts?.myTeamPosts.pageInfo.endCursor || null,
        },
        updateQuery: (prevLoad, { fetchMoreResult }): MyTeamPostsType => {
          if (!fetchMoreResult) return prevLoad
          fetchMoreResult!.myTeamPosts.edges = [
            ...prevLoad.myTeamPosts.edges!,
            ...fetchMoreResult!.myTeamPosts.edges!,
          ]
          return fetchMoreResult
        },
      }),
    [dataMoreMyTeamPosts]
  )

  const fetchFirstPost = useCallback(
    () =>
      fetchMore({
        variables: {
          first: NUM_PAGE,
        },
        updateQuery: (prevLoad, { fetchMoreResult }): MyTeamPostsType => {
          return fetchMoreResult!
        },
      }),
    []
  )

  return (
    <>
      <SectionTitle>投稿一覧</SectionTitle>
      <Box>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            createPost()
          }}
        >
          {!dataMyProfile?.myProfile.isGuest && (
            <Flex pb={10}>
              <Input
                value={text}
                onChange={onChangeText}
                borderColor="gray.500"
                data-testid="post-text-form"
              />
              <Button
                type="submit"
                bg="rgb(255, 255, 0)"
                color="black"
                data-testid="create-post-button"
              >
                投稿
              </Button>
            </Flex>
          )}
        </form>
        {loadingMoreMyTeamPosts ? (
          <Box textAlign="center">
            <Spinner />
          </Box>
        ) : (
          <>
            {errorMoreMyTeamPosts && <FailedText />}
            {dataMoreMyTeamPosts?.myTeamPosts.edges?.length === 0 && (
              <Text textAlign="center">投稿はありません。</Text>
            )}
            {dataMoreMyTeamPosts?.myTeamPosts.edges?.map(({ node }) => (
              <Box>
                {dataMyProfile?.myProfile.id! === node.profile.id ? (
                  <Flex justify="flex-end" mb="20px">
                    <Box textAlign="right">
                      <Flex alignItems="center" justify="flex-end">
                        <Box pr={3}>
                          <FontAwesomeIcon
                            icon={faX}
                            data-testid={node.id + '-post-delete-icon'}
                            onClick={() =>
                              onOpenConfirmPostDeleteModal(node.id, node.text)
                            }
                          />
                        </Box>
                        <SpeechBallon isMyPost={true}>{node.text}</SpeechBallon>
                      </Flex>
                      <Text
                        pr={5}
                        pt={1}
                        opacity="0.7"
                        data-testid={node.id + '-post-created-at'}
                      >
                        {moment(node.createdAt).format('M月D日(ddd) H時m分')}
                      </Text>
                    </Box>
                    <PostMemberItem nickname={node.profile.nickname} />
                  </Flex>
                ) : (
                  <Flex mb="20px">
                    <PostMemberItem nickname={node.profile.nickname} />
                    <Box>
                      <Flex alignItems="center">
                        <SpeechBallon isMyPost={false}>
                          {node.text}
                        </SpeechBallon>
                        {dataMyProfile?.myProfile.isCoach && (
                          <Box pl={3}>
                            <FontAwesomeIcon
                              icon={faX}
                              data-testid={node.id + '-post-delete-icon'}
                              onClick={() =>
                                onOpenConfirmPostDeleteModal(node.id, node.text)
                              }
                            />
                          </Box>
                        )}
                      </Flex>
                      <Text
                        pl={5}
                        pt={1}
                        opacity="0.7"
                        data-testid={node.id + '-post-created-at'}
                      >
                        {moment(node.createdAt).format('M月D日(ddd) H時m分')}
                      </Text>
                    </Box>
                  </Flex>
                )}
              </Box>
            ))}
            {dataMoreMyTeamPosts?.myTeamPosts.pageInfo.hasNextPage && (
              <Box textAlign="center">
                <FetchMoreLink
                  name="post"
                  onClick={fetchMorePost}
                  text="以前の10件の投稿"
                />
              </Box>
            )}
            {dataMoreMyTeamPosts?.myTeamPosts.edges?.length! > 10 && (
              <Box pt={10}>
                <SectionCloseLink name="post-list" onClick={fetchFirstPost} />
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  )
})
