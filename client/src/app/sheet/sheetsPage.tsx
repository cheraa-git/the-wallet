import { FC } from 'react'
import { useAppSelector } from '../../store/store'
import { SheetCard } from './sheetCard'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export const SheetsPage: FC = () => {
  const { sheets } = useAppSelector(state => state.sheet)
  return (
    <Box mx={4} mt={2}>
      <Box display="flex" justifyContent="space-between">
        <Typography alignSelf="center">Доступные счета:</Typography>
        <Tooltip title="Добавить счет">
          <IconButton color="primary"><AddIcon/></IconButton>
        </Tooltip>
      </Box>
      {sheets.map(sheet => <SheetCard key={sheet._id} sheet={sheet}/>)}
    </Box>
  )
}
