import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react'
import { useField } from 'formik'
import React, { FC, InputHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  textarea?: boolean
}

const InputField: FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  let InputOrTextarea: any = textarea ? Textarea : Input

  const [field, { error }] = useField(props)
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export default InputField
