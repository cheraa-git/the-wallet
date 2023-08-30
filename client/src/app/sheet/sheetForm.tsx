import { FC } from 'react'
import { SheetType } from '../../../../common/types/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CreateSheetBody } from '../../../../common/types/request/sheetRequestTypes'

interface SheetFormProps {
  onSubmit: SubmitHandler<Inputs>
  defaultValues?: CreateSheetBody
}

interface Inputs {
  title: string
  type: SheetType
  description: string,
}

export const SheetForm: FC<SheetFormProps> = ({ onSubmit, defaultValues }) => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ defaultValues })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box mb={2}>
        <Typography>Название</Typography>
        <TextField fullWidth size="small" {...register('title', { required: true })} error={!!errors.title}/>
      </Box>

      <Box mb={2}>
        <Typography>Название</Typography>
        <TextField fullWidth size="small" select defaultValue="Наличные" {...register('type', { required: true })}
                   error={!!errors.type}>
          <MenuItem value="Карта">Карта</MenuItem>
          <MenuItem value="Наличные">Наличные</MenuItem>
          <MenuItem value="Кредитная карта">Кредитная карта</MenuItem>
          <MenuItem value="Вклад">Вклад</MenuItem>
        </TextField>
      </Box>

      <Box mb={2}>
        <Typography>Описание</Typography>
        <TextField fullWidth size="small" multiline minRows={2} {...register('description')}
                   error={!!errors.description}/>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button color="inherit" onClick={() => navigate('/sheets')}>Отмена</Button>
        <Button type="submit">Сохранить</Button>
      </Box>
    </Box>
  )
}
