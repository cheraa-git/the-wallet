import { FC, useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, IconButton, LinearProgress, Typography } from '@mui/material'
import { useAppDispatch } from '../../store/store'
import { Spinner } from '../../common/Loader/spinner'
import { formatDateRelative } from '../../utils/format'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { SheetMenu } from './sheetMenu'
import { loadCategories } from '../../store/category/actions'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { loadTransactions } from '../../store/transaction/actions'
import { AddTransactionDialog } from '../transaction/addTransactionDialog'
import { TransactionType } from '../../../../common/types/types'
import { useSheetState } from '../../store/sheet/slice'
import { useTransactionState } from '../../store/transaction/slice'
import { useCategoryState } from '../../store/category/slice'
import { Transactions } from '../transaction/transactions'


export const SheetPage: FC = () => {
  const dispatch = useAppDispatch()
  const { sheetId } = useParams()
  const navigate = useNavigate()
  const { sheets, loading } = useSheetState()
  const { loading: transactionLoading, totalAmount } = useTransactionState()
  const { loading: categoryLoading } = useCategoryState()
  const sheet = sheets?.find(s => s._id === sheetId)
  const [addTransactionDialogOpen, setAddTransactionDialogOpen] = useState<TransactionType | null>(null)


  useEffect(() => {
    if (sheetId) {
      dispatch(loadCategories(sheetId))
      dispatch(loadTransactions(sheetId))
    }
  }, [sheetId, dispatch])

  useEffect(() => {
    if (!loading && !sheet) {
      navigate('/sheets')
    }
  }, [sheet, loading, navigate])

  if (loading) return <Box display="flex" justifyContent="center" mt={5}><Spinner/></Box>
  if (!sheet || !sheetId) return <></>
  return (
    <Box>
      <Card sx={{ my: 2 }}>
        <Box display="flex" justifyContent="space-between" mx={2}>
          <Box display="flex">
            <NavLink to="/sheets">
              <IconButton color="primary"><ArrowBackIosIcon/></IconButton>
            </NavLink>
            <Typography variant="h5" alignSelf="center">
              {sheet.title}
            </Typography>
          </Box>
          <Box display="flex">
            <Typography variant="body2" alignSelf="center" color="text.secondary">
              Список создан {formatDateRelative(sheet.createdAt)}
            </Typography>
            <SheetMenu/>
          </Box>
        </Box>

        <CardContent sx={{ ml: 6 }}>
          <Typography color="text.secondary">
            {sheet.description}
          </Typography>
          <Box display="flex">
            <Button color="success" onClick={() => setAddTransactionDialogOpen('income')}><AddIcon/> Доход</Button>
            <Button color="error" onClick={() => setAddTransactionDialogOpen('expense')}><RemoveIcon/> Расход</Button>
            <AddTransactionDialog type={addTransactionDialogOpen} onClose={() => setAddTransactionDialogOpen(null)}/>

            <Typography ml="auto" mr={3} variant="h5" fontWeight="lighter" color={totalAmount > 0 ? 'green' : 'error'}>
              {totalAmount.toLocaleString()} ₽
            </Typography>
          </Box>
        </CardContent>
        {(transactionLoading || categoryLoading) && <LinearProgress/>}
      </Card>
      <Box>
        <Transactions/>
      </Box>
    </Box>
  )
}
