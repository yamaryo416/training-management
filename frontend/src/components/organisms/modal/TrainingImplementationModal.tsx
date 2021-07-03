import { memo, VFC } from "react";
import { Heading, Text, Box } from "@chakra-ui/layout";

import { useControllModal } from "../../../hooks/useControllModal";
import { ModalLayout } from "../layout/ModalLayout";
import { useRecoilValue } from "recoil";
import { trainingImplementationState } from "../../../store/trainingImplementationState";
import { TrainingFinishedItem } from '../../organisms/training/TrainingFinishedItem'
import { useCallback } from "react";
import { Flex } from "@chakra-ui/react";
import { FinishedScheduleNodeType } from "../../../../types/queriesType";

type Props = {
    finishedSchedules: {
        edges: FinishedScheduleNodeType[]
    }
}

export const TrainingImplementationModal: VFC<Props> = memo((props) => {
    const { finishedSchedules } = props

    const { onCloseTrainingImplementationModal } = useControllModal()

    const trainingImplementationModal = useRecoilValue(trainingImplementationState)

    const { trainingId, title, finishedPatern, isOpen } = trainingImplementationModal

    const trainingTotalNubmer = useCallback(() => {
        const number = [0, 0, 0]
        if (finishedPatern.includes('1')) {
            finishedSchedules.edges.filter(fSche => fSche.node.training.id === trainingId).map(fsche => {
                number[0] += fsche.node.count
            })
        } 
        if (finishedPatern.includes('3')) {
            finishedSchedules.edges.filter(fSche => fSche.node.training.id === trainingId).map(fsche => {
                number[1] += fsche.node.distance
            })
        } 
        if (finishedPatern.includes('4')) {
            finishedSchedules.edges.filter(fSche => fSche.node.training.id === trainingId).map(fsche => {
                number[2] += fsche.node.minitus
            })
        } 
        return number
    }, [trainingImplementationModal, finishedSchedules])

    return (
        <ModalLayout
            title="トレーニング実施状況"
            isOpen={isOpen}
            onClose={onCloseTrainingImplementationModal}
        >
            <Flex pt={5}>
                <Heading fontSize='18px'>トレーニング:</Heading>
                <Text pl={2} data-testid='training-implementation-title'>{title}</Text>
            </Flex>
            <Flex>
                <Heading fontSize='18px'>累計:</Heading>
                {finishedPatern.includes('1') && <Text pl={2}>{trainingTotalNubmer()[0]} 回</Text> }
                {finishedPatern.includes('3') && <Text pl={2}>{trainingTotalNubmer()[1]} km</Text> }
                {finishedPatern.includes('4') && <Text pl={2}>{trainingTotalNubmer()[2]} 分</Text> }
                <Text pl={2}>実施</Text>
            </Flex>
            <Box>
                <Flex borderBottom='double 4px black'>
                    <Heading pl='20px' pb={2} fontSize='20px'>
                        日付
                    </Heading>
                </Flex>
                 {finishedSchedules.edges.filter(fSche => fSche.node.training.id === trainingId).map(({ node }) => (
                    <TrainingFinishedItem
                        finishedPatern={finishedPatern}
                        date={node.schedule.date}
                        count={node.count}
                        load={node.load}
                        distance={node.distance}
                        minitus={node.minitus}
                    />
                ))}
            </Box>
        </ModalLayout>
    )
})