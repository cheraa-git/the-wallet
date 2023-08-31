import { FC, MouseEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { CreateCategoryBody } from '../../../../common/types/request/categoryRequestTypes'
import { CategoryType } from '../../../../common/types/types'
import { useParams } from 'react-router-dom'
import { CategoryTypeLabel } from '../../constants/constants'


interface CategoryFormProps {
  onSubmit: SubmitHandler<CreateCategoryBody>
  defaultValues?: Partial<CreateCategoryBody>
}

export const CategoryForm: FC<CategoryFormProps> = ({ onSubmit, defaultValues }) => {
  const { sheetId } = useParams()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateCategoryBody>()
  const [type, setType] = useState<CategoryType>(defaultValues?.type || 'expense')

  const handleChangeType = (event: MouseEvent<HTMLElement>, newAlignment: CategoryType) => {
    setType(newAlignment)
  }

  const submitHandler = (data: CreateCategoryBody) => {
    onSubmit({ ...data, type, sheetId: sheetId || '' })
    handleReset()
  }

  const handleReset = (data?: Partial<CreateCategoryBody>) => {
    reset(data)
    setType(data?.type || 'expense')
  }

  useEffect(() => {
    handleReset(defaultValues)
  }, [defaultValues])


  return (
    <Box component="form" onSubmit={handleSubmit(submitHandler)}>
      <Box mb={2}>
        <Typography>Наименование</Typography>
        <TextField fullWidth size="small" {...register('name', { required: true })} error={!!errors.name}/>
      </Box>
      <Box mb={2}>
        <ToggleButtonGroup value={type} onChange={handleChangeType} exclusive color="primary">
          <ToggleButton value="expense">{CategoryTypeLabel.expense}</ToggleButton>
          <ToggleButton value="income">{CategoryTypeLabel.income}</ToggleButton>
          <ToggleButton value="both">{CategoryTypeLabel.both}</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box display="flex" justifyContent="end">
        <Button type="submit">{defaultValues ? 'Изменить' : 'Создать'}</Button>
      </Box>
    </Box>
  )
}
