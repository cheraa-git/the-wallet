import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CreateTransactionBody } from '../../../../common/types/request/transactionRequestTypes'
import { Autocomplete, Box, Button, InputLabelProps, TextField, Typography } from '@mui/material'
import { ICategory, TransactionType } from '../../../../common/types/types'
import { useCategoryState } from '../../store/category/slice'

interface TransactionFormProps {
  onSubmit: SubmitHandler<CreateTransactionBody>
  type: TransactionType,
  sheetId: string
  defaultValues?: Partial<CreateTransactionBody>
  onCancel?: () => void
}

interface Inputs {
  amount: number
  name: string
  categoryName: string
  description: string
}

export const TransactionForm: FC<TransactionFormProps> = ({ onSubmit, defaultValues, type, onCancel, sheetId }) => {
  const { categories, selectCategoryByName, selectCategoryById } = useCategoryState()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>()
  const defaultCategory = selectCategoryById(defaultValues?.categoryId || '')
  const filteredCategories = categories.filter(c => c.type === type || c.type === 'both')

  useEffect(() => {
    let payload = {}
    if (defaultValues && defaultCategory) {
      payload = { ...defaultValues, categoryName: defaultCategory.name }
    }
    reset(payload)
  }, [defaultValues, defaultCategory, reset])

  const submitHandler = (data: Inputs) => {

    const category = selectCategoryByName(data.categoryName)
    if (!category) {
      return
    }
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
          options={filteredCategories}
          groupBy={(option: ICategory) => option.name[0].toUpperCase()}
          getOptionLabel={(option: ICategory) => option.name}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          size="small"
          defaultValue={defaultCategory}
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

      <Box display="flex" flexDirection="row-reverse" justifyContent="space-between">
        <Button type="submit">{defaultValues ? 'Изменить' : 'Создать'}</Button>
        {onCancel && <Button color="inherit" onClick={onCancel}>Отмена</Button>}
      </Box>

    </Box>
  )
}
