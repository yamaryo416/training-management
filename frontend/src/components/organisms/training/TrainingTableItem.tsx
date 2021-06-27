import { memo, VFC } from "react";
import { Box, Flex, Text, Link } from "@chakra-ui/layout";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { TrainingNodeType } from "../../../../types/queriesType";
import { TrainingIcon } from "../../molecules/TrainingIcon";
import { useGetMyProfile } from "../../../hooks/queries/useGetMyProfile";
import { useControllModal } from "../../../hooks/useControllModal";
import { useNumber } from "../../../hooks/useNumber";
import { CustomSpinner } from '../../atoms/spinner/CustomSpinner'

type Props = TrainingNodeType & {
    isMyTeam: boolean;
}

export const TrainingTableItem: VFC<Props> = memo((props) => {
    const { node, isMyTeam } = props;

    const { dataMyProfile, loadingMyProfile } = useGetMyProfile()
    const { 
        onOpenTrainingUpdateModal,
        onOpenConfirmTrainingDeleteModal,
        onOpneTrainingDetailModal,
        onOpenTrainingImplementationModal
    } = useControllModal()
    const { zeroNumber } = useNumber()

    if (loadingMyProfile) return <CustomSpinner />
     
    return (
        <Box key={node.id} py={5} borderBottom="1px solid #718096">
            <Flex alignItems="center">
                <Box w={{ base: "30px", md: "60px"}} data-testid={node.id + '-training-icon'}>
                    <TrainingIcon iconNumber={node.iconNumber} color="white" size="50px" />
                </Box>
                <Text
                    w={{ base: "120px", md: "130px" }}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"  
                    data-testid={node.id + '-training-title'}              
                    onClick={() => {
                        if (isMyTeam) {
                            onOpneTrainingDetailModal(
                                node.title,
                                node.description,
                                node.finishedPatern,
                                zeroNumber(node.iconNumber)
                            )
                        } 
                }}>
                    {node.title}
                </Text>
                {isMyTeam && !dataMyProfile?.myProfile.isGuest! && (
                    <>
                        <Text pl="15px" data-testid={node.id + '-training-finished-count'}>
                            {node.finishedSchedules.edges?.
                                filter(({ node }) => node.profile.id === dataMyProfile?.myProfile.id).length}回
                        </Text>
                        {dataMyProfile?.myProfile.isCoach && (
                            <>
                                <Box pl={{ base: 5, md: 10 }}>
                                    <EditIcon
                                        data-testid={node.id + '-training-edit-icon'}
                                        onClick={() => {
                                            onOpenTrainingUpdateModal(
                                                node.id,
                                                node.title,
                                                node.description,
                                                zeroNumber(node.iconNumber),
                                                node.finishedPatern
                                            )
                                    }} />
                                </Box>
                                <Box pl={5}>
                                    <DeleteIcon
                                        data-testid={node.id + '-training-delete-icon'}
                                        onClick={() => {
                                            onOpenConfirmTrainingDeleteModal(
                                                node.id,
                                                node.title,
                                                node.description,
                                            )
                                        }}
                                    / >
                                </Box>
                            </>
                        )}
                    </>
                )}
            </Flex>
              {isMyTeam && !dataMyProfile.myProfile.isGuest && 
                <Link color='orange' pl={{ base: '30px', md: '60px' }} data-testid={`${node.id}-training-implementation-list`}  onClick={() => onOpenTrainingImplementationModal(node.id, node.title, node.finishedPatern)}>
                    実施状況
                </Link>
            }
        </Box>
    )
})