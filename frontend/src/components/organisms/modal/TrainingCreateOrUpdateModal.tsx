import { ChangeEvent, memo, useCallback, useState, VFC } from 'react'
import {
  Button,
  Box,
  Flex,
  Stack,
  Wrap,
  WrapItem,
  FormLabel,
} from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { object, string, number } from 'yup'

import { useControllModal } from '../../../hooks/useControllModal'
import { useCreateTraining } from '../../../hooks/queries/useCreateTraining'
import { TrainingIcon } from '../../molecules/TrainingIcon'
import { PrimaryButton } from '../../atoms/button/PrimaryButton'
import { ModalLayout } from '../layout/ModalLayout'
import { trainingCreateOrUpdateModalState } from '../../../store/trainingCreateOrUpdateModalState'
import { useUpdateTraining } from '../../../hooks/queries/useUpdateTraining'
import { Formik } from 'formik'
import { CustomForm } from '../../molecules/CustomForm'
import { useNumber } from '../../../hooks/useNumber'
import { ErrorText } from '../../atoms/text/ErrorText'
import { useTrainingState } from '../../../hooks/useTrainingState'

export const TrainingCreateOrUpdateModal: VFC = memo(() => {
  const { onCloseTrainingCreateOrUpdateModal } = useControllModal()
  const { isIconSelect, onChangeIsIconSelect } = useTrainingState()
  const { undefinedNumber } = useNumber()
  const { createTraining } = useCreateTraining()
  const { updateTraining } = useUpdateTraining()

  const [trainingCreateOrUpdateModal, setTrainingCreateOrUpdateModal] =
    useRecoilState(trainingCreateOrUpdateModalState)

  const {
    id,
    title,
    description,
    iconNumber,
    finishedPatern,
    isCreate,
    isOpen,
  } = trainingCreateOrUpdateModal

  const onChangeIconNumber = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setTrainingCreateOrUpdateModal({
        ...trainingCreateOrUpdateModal,
        iconNumber: Number(e.target.value),
      }),
    [trainingCreateOrUpdateModal]
  )

  const onChangeFinishedPatern = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (finishedPatern.includes(value)) {
        setTrainingCreateOrUpdateModal({
          ...trainingCreateOrUpdateModal,
          finishedPatern: finishedPatern.replace(value, ''),
        })
      } else {
        setTrainingCreateOrUpdateModal({
          ...trainingCreateOrUpdateModal,
          finishedPatern: finishedPatern + value,
        })
      }
    },
    [trainingCreateOrUpdateModal]
  )

  const selectIcon = [...Array(11)].map((_, i) => (
    <WrapItem key={i + 1}>
      <Box textAlign="center">
        <Box>
          <TrainingIcon iconNumber={i + 1} color="black" size="50px" />
        </Box>
        <input
          name="icon"
          type="radio"
          value={i + 1}
          onChange={onChangeIconNumber}
          checked={i + 1 === iconNumber}
        />
      </Box>
    </WrapItem>
  ))

  return (
    <ModalLayout
      title={isCreate ? 'トレーニング作成' : 'トレーニング編集'}
      isOpen={isOpen}
      onClose={() => {
        onCloseTrainingCreateOrUpdateModal()
      }}
    >
      <Formik
        initialValues={{
          title,
          description,
        }}
        onSubmit={(values) => {
          isCreate
            ? createTraining(
                values.title,
                values.description,
                undefinedNumber(iconNumber),
                finishedPatern
              )
            : updateTraining(
                id,
                values.title,
                values.description,
                undefinedNumber(iconNumber),
                finishedPatern
              )
        }}
        validationSchema={object().shape({
          title: string()
            .required('1文字以上入力してください。')
            .max(20, '20文字以内で入力してください'),
          count: number(),
          load: number(),
          distance: number(),
        })}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <CustomForm
                name="title"
                type="text"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.title}
                placeholder="ランニング"
              >
                トレーニング名
              </CustomForm>
              {touched.title && errors.title && (
                <ErrorText>{errors.title}</ErrorText>
              )}
              <CustomForm
                name="description"
                type="string"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.description}
                placeholder="早めのペースで走りましょう"
              >
                説明
              </CustomForm>
              <Box>
                <FormLabel fontSize="20px">
                  トレーニングを実施した際に
                  <br />
                  入力する項目
                </FormLabel>
                <Flex>
                  <Box mr={2}>
                    <input
                      type="checkbox"
                      value="1"
                      checked={finishedPatern.includes('1')}
                      data-testid="finished-patern-1"
                      onChange={onChangeFinishedPatern}
                    />
                  </Box>
                  <label>回数</label>
                </Flex>
                <Flex>
                  <Box mr={2}>
                    <input
                      type="checkbox"
                      value="2"
                      checked={finishedPatern.includes('2')}
                      data-testid="finished-patern-2"
                      onChange={onChangeFinishedPatern}
                    />
                  </Box>
                  <label>kg</label>
                </Flex>
                <Flex>
                  <Box mr={2}>
                    <input
                      type="checkbox"
                      value="3"
                      checked={finishedPatern.includes('3')}
                      data-testid="finished-patern-3"
                      onChange={onChangeFinishedPatern}
                    />
                  </Box>
                  <label>km</label>
                </Flex>
                <Flex>
                  <Box mr={2}>
                    <input
                      type="checkbox"
                      value="4"
                      checked={finishedPatern.includes('4')}
                      data-testid="finished-patern-4"
                      onChange={onChangeFinishedPatern}
                    />
                  </Box>
                  <label>分</label>
                </Flex>
              </Box>
              <Box textAlign="center">
                <Button
                  data-testid="change-icon-select-mode"
                  onClick={onChangeIsIconSelect}
                >
                  アイコンを選択する
                </Button>
              </Box>
              {isIconSelect && <Wrap>{selectIcon}</Wrap>}
              <Box textAlign="center">
                <PrimaryButton
                  name="training-create"
                  type="submit"
                  disabled={!isValid}
                  onClick={() => null}
                >
                  {isCreate ? 'トレーニンングを作成する' : '編集する'}
                </PrimaryButton>
              </Box>
            </Stack>
          </form>
        )}
      </Formik>
    </ModalLayout>
  )
})
