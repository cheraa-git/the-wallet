import { FC } from 'react'
import { Container, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/store'
import { createSheet } from '../../store/sheet/actions'
import { SheetForm } from './sheetForm'
import { CreateSheetBody } from '../../../../common/types/request/sheetRequestTypes'
import { useSheetState } from '../../store/sheet/slice'
import { useSnackbar } from 'notistack'


export const CreateSheetPage: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { sheets } = useSheetState()
  const { enqueueSnackbar } = useSnackbar()


  const handleSubmit = (data: CreateSheetBody) => {
    if (sheets.find(s => s.title === data.title)) {
      return enqueueSnackbar('Список с таким именем уже существует', { variant: 'warning' })
    }
    dispatch(createSheet(data))
      .then(() => navigate('/sheets'))
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">Создание списка</Typography>
        <SheetForm onSubmit={handleSubmit}/>
      </Paper>
    </Container>
  )
}
