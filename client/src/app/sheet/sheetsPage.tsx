import { FC, useEffect } from 'react'
import { useAppDispatch } from '../../store/store'
import { SheetCard } from './sheetCard'
import { Box, Container, IconButton, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { NavLink } from 'react-router-dom'
import { loadTransactions } from '../../store/transaction/actions'
import { useSheetState } from '../../store/sheet/slice'

export const SheetsPage: FC = () => {
  const dispatch = useAppDispatch()
  const { sheets } = useSheetState()

  useEffect(() => {
    dispatch(loadTransactions())
  }, [dispatch])

  return (
    <Box>
      <Container>
        <Box display="flex" justifyContent="space-between">
          <Typography alignSelf="center">Доступные счета:</Typography>
          <Tooltip title="Добавить счет">
            <NavLink to="/sheets/new">
              <IconButton color="primary"><AddIcon/></IconButton>
            </NavLink>
          </Tooltip>
        </Box>
        {sheets.map(sheet => <SheetCard key={sheet._id} sheet={sheet}/>)}
      </Container>
    </Box>
  )
}
