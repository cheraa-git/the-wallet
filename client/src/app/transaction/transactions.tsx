import { FC, MouseEvent, useState } from 'react'
import { useTransactionState } from '../../store/transaction/slice'
import { TransactionCard } from './transactionCard'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material'
import { ITransaction, TransactionType } from '../../../../common/types/types'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { AddTransactionDialog } from './addTransactionDialog'
import _ from 'lodash'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useCategoryState } from '../../store/category/slice'

export const Transactions: FC<{ sheetId: string }> = ({ sheetId }) => {
  const { transactions: defaultTransactions } = useTransactionState()
  const { categories } = useCategoryState()
  const [addTransactionDialogOpen, setAddTransactionDialogOpen] = useState<TransactionType | null>(null)
  const [sortBy, setSortBy] = useState<{ path: string, order: 'asc' | 'desc' }>({ path: 'createdAt', order: 'desc' })
  const [categoryFilter, setCategoryFilter] = useState('all')

  const getFilteredAndSortedTransactions = () => {
    const sortedTransactions: ITransaction[] = _.orderBy(defaultTransactions, [sortBy.path], [sortBy.order])
    if (categoryFilter !== 'all') {
      return sortedTransactions.filter(t => t.categoryId === categoryFilter)
    }
    return sortedTransactions
  }

  const handleSort = (event: MouseEvent, value: string | null) => {
    if (value) {
      setSortBy({ path: value, order: 'asc' })
    } else {
      setSortBy({ path: sortBy.path, order: sortBy.order === 'asc' ? 'desc' : 'asc' })
    }
  }

  const getSortIcon = (sortPath: string) => {
    if (sortBy.path === sortPath) {
      if (sortBy.order === 'asc') return <ArrowDropUpIcon/>
      else if (sortBy.order === 'desc') return <ArrowDropDownIcon/>
    }
    return <></>
  }


  const handleFilterByCategory = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value)
  }

  const transactions = getFilteredAndSortedTransactions()

  return (
    <Container maxWidth="md">
      <Box display="flex" mb={2}>
        <ButtonGroup>
          <Button color="success" onClick={() => setAddTransactionDialogOpen('income')}><AddIcon/> Доход</Button>
          <Button color="error" onClick={() => setAddTransactionDialogOpen('expense')}><RemoveIcon/> Расход</Button>
        </ButtonGroup>

        <ToggleButtonGroup size="small" value={sortBy.path} onChange={handleSort} exclusive color="primary"
                           sx={{ ml: 'auto', mr: 1 }}>
          <ToggleButton value="createdAt">дата {getSortIcon('createdAt')}</ToggleButton>
          <ToggleButton value="amount">сумма {getSortIcon('amount')}</ToggleButton>
        </ToggleButtonGroup>

        <Select value={categoryFilter} onChange={handleFilterByCategory}>
          <MenuItem value="all">Все категории</MenuItem>
          {categories.map(category => (
            <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
          ))}
        </Select>
      </Box>

      <AddTransactionDialog
        type={addTransactionDialogOpen}
        onClose={() => setAddTransactionDialogOpen(null)}
        sheetId={sheetId}
      />
      {transactions.map(transaction => <TransactionCard key={transaction._id} transaction={transaction}/>)}
    </Container>
  )
}
