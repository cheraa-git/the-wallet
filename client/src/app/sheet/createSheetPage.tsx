import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, Container, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/store'
import { createSheet } from '../../store/sheet/actions'
import { SheetType } from '../../../../common/types/types'


interface Inputs {
  title: string
  type: SheetType
  description: string,
}

export const CreateSheetPage: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(createSheet(data))
      .then(() => navigate('/sheets'))
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">Создание списка</Typography>
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
      </Paper>
    </Container>
  )
}
