import { memo, VFC } from 'react'
import { Heading, Text, Flex } from '@chakra-ui/react'

import { useControllModal } from '../../../hooks/useControllModal'
import { ModalLayout } from '../layout/ModalLayout'
import { useRecoilValue } from 'recoil'
import { trainingDetailModalState } from '../../../store/trainingDetailModalState'

export const TrainingDetailModal: VFC = memo(() => {
  const { onCloseTrainingDetailModal } = useControllModal()

  const trainingDetailModal = useRecoilValue(trainingDetailModalState)

  const { title, description, finishedPatern, isOpen } = trainingDetailModal

  return (
    <ModalLayout
      title=""
      isOpen={isOpen}
      onClose={() => {
        onCloseTrainingDetailModal()
      }}
    >
      <Heading
        fontSize="20px"
        textAlign="center"
        data-testid="training-detail-title"
      >
        {title}
      </Heading>
      {description !== '' && (
        <Flex>
          <Heading fontSize="18px">説明:</Heading>
          <Text pl={2} fontSize="16px" data-testid="training-description">
            {description}
          </Text>
        </Flex>
      )}
      {finishedPatern !== '' && (
        <Flex alignItems="center">
          <Text fontSize="18px">実施する際に</Text>
          {finishedPatern.includes('1') && (
            <Text pl={2} data-testid="training-detail-count">
              回数
            </Text>
          )}
          {finishedPatern.includes('2') && (
            <Text pl={2} data-testid="training-detail-load">
              負荷
            </Text>
          )}
          {finishedPatern.includes('3') && (
            <Text pl={2} data-testid="training-detail-distance">
              距離
            </Text>
          )}
          {finishedPatern.includes('4') && (
            <Text pl={2} data-testid="training-detail-minitus">
              時間
            </Text>
          )}
          <Text fontSize="18px" pl={2}>
            を記録
          </Text>
        </Flex>
      )}
    </ModalLayout>
  )
})
