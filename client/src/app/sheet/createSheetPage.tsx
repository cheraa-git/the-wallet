import { FC } from 'react'
import { Container, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/store'
import { createSheet } from '../../store/sheet/actions'
import { SheetForm } from './sheetForm'
import { CreateSheetBody } from '../../../../common/types/request/sheetRequestTypes'


export const CreateSheetPage: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  const handleSubmit = (data: CreateSheetBody) => {
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
