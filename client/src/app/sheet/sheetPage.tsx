import React, { FC, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Typography
} from '@mui/material'
import { useAppDispatch } from '../../store/store'
import { formatDateRelative } from '../../utils/format'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { SheetMenu } from './sheetMenu'
import { loadCategories } from '../../store/category/actions'

import { loadTransactions } from '../../store/transaction/actions'
import { useSheetState } from '../../store/sheet/slice'
import { useTransactionState } from '../../store/transaction/slice'
import { useCategoryState } from '../../store/category/slice'
import { Transactions } from '../transaction/transactions'
import { SheetTypeLabel } from '../../constants/constants'


export const SheetPage: FC = () => {
  const dispatch = useAppDispatch()
  const { sheetId } = useParams()
  const navigate = useNavigate()
  const { sheets, loading } = useSheetState()
  const { loading: transactionLoading, totalAmount } = useTransactionState()
  const { loading: categoryLoading } = useCategoryState()
  const sheet = sheets?.find(s => s._id === sheetId)



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

  if (loading) return <Box display="flex" justifyContent="center" mt={5}><CircularProgress/></Box>
  if (!sheet || !sheetId) return <></>
  return (
    <Box>
      <Card sx={{ my: 2 }}>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" mx={2}>
            <Box display="flex">
              <NavLink to="/sheets">
                <IconButton color="primary"><ArrowBackIosIcon/></IconButton>
              </NavLink>
              <Box display="flex">
                <Typography variant="h5" alignSelf="center" mr={2}>
                  {sheet.title}
                </Typography>
                <Chip label={SheetTypeLabel[sheet.type]} size="small"/>
              </Box>
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
            <Typography ml="auto" mr={3} variant="h5" fontWeight="lighter" color={totalAmount > 0 ? 'green' : 'error'}>
              {totalAmount.toLocaleString()} ₽
            </Typography>
          </CardContent>
        </Container>
        {(transactionLoading || categoryLoading) && <LinearProgress/>}
      </Card>

      <Transactions sheetId={sheetId}/>
    </Box>
  )
}
