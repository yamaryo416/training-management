import axios from "axios";
import { memo, VFC, useEffect, useState } from "react";
import { Heading, Text, Flex } from "@chakra-ui/layout";

import { useControllModal } from "../../../hooks/useControllModal";
import { ModalLayout } from "../layout/ModalLayout";
import { useRecoilValue } from "recoil";
import { trainingDetailModalState } from "../../../store/trainingDetailModalState";
import { Box } from "@material-ui/core";

export const TrainingDetailModal: VFC = memo(() => {
    const [videoId, setVideoId] = useState('')

    const { onCloseTrainingDetailModal } = useControllModal()

    const trainingDetailModal = useRecoilValue(trainingDetailModalState)

    const { title, description, finishedPatern, isOpen } = trainingDetailModal

    const youtubeUrl = 'https://www.youtube.com/embed/' + videoId;

    useEffect(() => {
        const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY

        const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q=${title}&maxResults=3&key=${YOUTUBE_API_KEY}`
        axios
            .get(url)
            .then(response => {
                setVideoId(response.data.items[0].id.videoId);
            })
    }, [trainingDetailModal])

    return (
        <ModalLayout
            title=""
            isOpen={isOpen}
            onClose={() => {
                onCloseTrainingDetailModal()
            }}>
            <Heading fontSize="20px" textAlign="center" data-testid='training-detail-title'>{title}</Heading>
            {description !== "" && (
                <Flex>
                    <Heading fontSize='18px'>説明:</Heading>
                    <Text pl={2} fontSize='16px' data-testid='training-description'>{description}</Text>
                </Flex>
            )}
            {finishedPatern !== '' && (
                <Flex alignItems='center'>
                    <Text fontSize='18px'>実施する際に</Text>
                    {finishedPatern.includes('1') && <Text pl={2} data-testid='training-detail-count'>回数</Text>}
                    {finishedPatern.includes('2') && <Text pl={2} data-testid='training-detail-load'>負荷</Text>}
                    {finishedPatern.includes('3') && <Text pl={2} data-testid='training-detail-distance'>距離</Text>}
                    {finishedPatern.includes('4') && <Text pl={2} data-testid='training-detail-minitus'>時間</Text>}
                    <Text fontSize='18px' pl={2}>を記録</Text>
                </Flex>
            )}
            <Box textAlign='center' m='20px' display={{ base: 'none', md: 'block' }}>
                <iframe
                    allowFullScreen={true}
                    id="ytplayer"
                    width="400"
                    height="270"
                    src={youtubeUrl}
                />
            </Box>
            <Box textAlign='center' m='20px' display={{ base: 'block', md: 'none' }}>
                <iframe
                    allowFullScreen={true}
                    id="ytplayer"
                    width="330"
                    height="250"
                    src={youtubeUrl}
                />
            </Box>
        </ModalLayout>
    )
})