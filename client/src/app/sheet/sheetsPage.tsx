import { FC } from 'react'
import { SheetCard } from './sheetCard'
import { Box, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { NavLink } from 'react-router-dom'
import { useSheetState } from '../../store/sheet/slice'
import { PieChart, PieValueType } from '@mui/x-charts'
import { useTransactionState } from '../../store/transaction/slice'

export const SheetsPage: FC = () => {
  const { sheets } = useSheetState()
  const { transactions } = useTransactionState()

  const chartData = transactions.reduce((acc, transaction) => {
    const existingSeriesIndex = acc[transaction.type].findIndex(item => item.id === transaction.sheetId)
    if (existingSeriesIndex > -1) {
      acc[transaction.type][existingSeriesIndex].value += transaction.amount
    } else {
      const sheetTitle = sheets.find(s => s._id === transaction.sheetId)?.title
      acc[transaction.type].push({ id: transaction.sheetId, value: transaction.amount, label: sheetTitle })
    }
    return acc
  }, { expense: [], income: [] } as { expense: PieValueType[], income: PieValueType[] })

  return (
    <Box>
      <Stack direction="row" textAlign="center" spacing={2} my={4} mx={4}>
        <Box flexGrow={1} bgcolor="#1FFF9A4D" className="rounded" px={3} py={1} hidden={chartData.income.length === 0}>
          <Typography fontWeight="bold">Доход</Typography>
          <PieChart
            series={[{ data: chartData.income, paddingAngle: 3, cornerRadius: 4 }]}
            width={400}
            height={200}
            sx={{ '--ChartsLegend-rootOffsetX': '-35px' }}
          />
        </Box>
        <Box flexGrow={1} bgcolor="#FF1F1F4D" px={3} py={1} hidden={chartData.expense.length === 0}>
          <Typography fontWeight="bold">Расход</Typography>
          <PieChart
            series={[{ data: chartData.expense, paddingAngle: 3, cornerRadius: 4 }]}
            width={400}
            height={200}
            sx={{ '--ChartsLegend-rootOffsetX': '-35px' }}
          />
        </Box>
      </Stack>
      <Container sx={{ height: '100%' }}>
        <Box display="flex" justifyContent="space-between">
          <Typography alignSelf="center" fontWeight="bold">Доступные счета:</Typography>
          <Tooltip title="Добавить счет">
            <NavLink to="/sheets/new">
              <IconButton color="primary"><AddIcon/></IconButton>
            </NavLink>
          </Tooltip>
        </Box>
        {sheets.map(sheet => <SheetCard key={sheet._id} sheet={sheet}/>)}
        {
          sheets.length === 0 &&
          <Typography textAlign="center" color="text.secondary">Пока нет ни одного счета</Typography>
        }
      </Container>
    </Box>
  )
}
