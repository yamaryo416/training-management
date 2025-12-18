import { ChangeEvent, FocusEvent, memo, VFC } from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'

type Props = {
  name: string
  type: string
  handleChange: {
    (e: ChangeEvent<any>): void
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void
  }
  handleBlur: {
    (e: FocusEvent<any>): void
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void
  }
  value: string
  placeholder: string
  children: string | null
}

export const CustomForm: VFC<Props> = memo((props) => {
  const { name, type, handleChange, handleBlur, value, placeholder, children } =
    props
  return (
    <FormControl>
      <FormLabel fontSize="16px" fontWeight="600" color="gray.700" mb={2}>{children}</FormLabel>
      <Input
        name={name}
        type={type}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        borderColor="gray.200"
        borderRadius="lg"
        placeholder={placeholder}
        data-testid={name + '-form'}
        bg="white"
        px={4}
        py={2}
        fontSize="15px"
        _hover={{
          borderColor: "brand.300",
        }}
        _focus={{
          borderColor: "brand.500",
          boxShadow: "0 0 0 1px brand.500",
        }}
        _placeholder={{
          color: "gray.400",
        }}
        transition="all 0.2s"
      />
    </FormControl>
  )
})
