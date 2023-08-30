import { FC, useEffect } from 'react'
import { Box, Container, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useConfirm } from '../../hooks/useConfirm'
import { useAppDispatch } from '../../store/store'
import { useSheetState } from '../../store/sheet/slice'
import { useNavigate, useParams } from 'react-router-dom'
import { Spinner } from '../../common/Loader/spinner'
import { removeSheet, updateSheet } from '../../store/sheet/actions'
import { SheetForm } from './sheetForm'
import { CreateSheetBody, UpdateSheetBody } from '../../../../common/types/request/sheetRequestTypes'


export const EditSheetPage: FC = () => {
  const navigate = useNavigate()
  const { sheetId } = useParams()
  const dispatch = useAppDispatch()
  const { showConfirm } = useConfirm()
  const { sheets, loading } = useSheetState()
  const sheet = sheets.find(s => s._id === sheetId)

  useEffect(() => {
    if (!loading && !sheet) {
      navigate('/sheets')
    }
  }, [sheet, loading])

  const handleRemove = () => {
    if (!sheet) return
    showConfirm('После удаления списка со всеми транзакциями восстановить данные будет невозможно.', () => {
      dispatch(removeSheet(sheet._id))
        .then(() => navigate('/sheets'))
    })
  }

  const handleSubmit = (data: CreateSheetBody) => {
    if (!sheet) return
    const payload: UpdateSheetBody = { ...sheet, ...data }
    dispatch(updateSheet(payload))
      .then(() => navigate(`/sheets/${payload._id}`))
  }

  if (loading) return <Box display="flex" justifyContent="center" mt={5}><Spinner/></Box>
  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5">Редактирование списка</Typography>
          <Tooltip title="Удалить список">
            <IconButton color="error" onClick={handleRemove}><DeleteIcon/></IconButton>
          </Tooltip>
        </Box>
        <SheetForm onSubmit={handleSubmit} defaultValues={sheet}/>
      </Paper>
    </Container>
  )
}
