import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { SheetCard } from './sheetCard'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { NavLink } from 'react-router-dom'
import { loadTransactions } from '../../store/transaction/actions'

export const SheetsPage: FC = () => {
  const dispatch = useAppDispatch()
  const { sheets } = useAppSelector(state => state.sheet)

  useEffect(() => {
    dispatch(loadTransactions())
  }, [dispatch])

  return (
    <Box mx={4} mt={2}>
      <Box display="flex" justifyContent="space-between">
        <Typography alignSelf="center">Доступные счета:</Typography>
        <Tooltip title="Добавить счет">
          <NavLink to="/sheets/new">
            <IconButton color="primary"><AddIcon/></IconButton>
          </NavLink>
        </Tooltip>
      </Box>
      {sheets.map(sheet => <SheetCard key={sheet._id} sheet={sheet}/>)}
    </Box>
  )
}
