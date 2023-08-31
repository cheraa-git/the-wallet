import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreateTransactionBody } from '../../../../common/types/request/transactionRequestTypes'
import { Autocomplete, Box, Button, InputLabelProps, TextField, Typography } from '@mui/material'
import { ICategory, TransactionType } from '../../../../common/types/types'
import { useParams } from 'react-router-dom'
import { useCategoryState } from '../../store/category/slice'

interface TransactionFormProps {
  onSubmit: SubmitHandler<CreateTransactionBody>
  type: TransactionType
  defaultValues?: Partial<CreateTransactionBody>
}

interface Inputs {
  amount: number
  name: string
  categoryName: string
  description: string
}

export const TransactionForm: FC<TransactionFormProps> = ({ onSubmit, defaultValues, type }) => {
  const { sheetId } = useParams()
  const { categories, selectCategoryByName } = useCategoryState()
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  const submitHandler = (data: Inputs) => {
    const category = selectCategoryByName(data.categoryName)
    if (!sheetId || !category) return
    const payload = { ...data, sheetId, type, categoryId: category._id, categoryName: undefined }
    onSubmit(payload)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(submitHandler)}>
      <Typography variant="h5"
                  color={type === 'expense' ? 'error' : 'green'}>{type === 'expense' ? 'Расход' : 'Доход'}</Typography>

      <Box mb={2}>
        <Typography>Сумма</Typography>
        <TextField fullWidth size="small" type="number"
                   inputProps={{ step: 0.01 }} {...register('amount', { required: true, valueAsNumber: true })}
                   error={!!errors.amount}/>
      </Box>

      <Box mb={2}>
        <Typography>Категория</Typography>
        <Autocomplete
          disablePortal
          clearOnEscape
          noOptionsText="Категория не найдена"
          autoComplete
          options={categories}
          groupBy={(option: ICategory) => option.name[0].toUpperCase()}
          getOptionLabel={(option: ICategory) => option.name}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          size="small"
          renderInput={params => (
            <TextField
              {...params}
              InputLabelProps={params.InputLabelProps as Partial<InputLabelProps<'label'>>}
              {...register('categoryName', { required: true })}
              error={!!errors.categoryName}
            />
          )}
        />
      </Box>

      <Box mb={2}>
        <Typography>Описание</Typography>
        <TextField fullWidth size="small" {...register('description')} error={!!errors.description} multiline
                   minRows={2}/>
      </Box>

      <Box display="flex" justifyContent="end">
        <Button type="submit">{defaultValues ? 'Изменить' : 'Создать'}</Button>
      </Box>

    </Box>
  )
}
