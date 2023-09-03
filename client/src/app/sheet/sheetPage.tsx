import React, { FC, useEffect, useState } from 'react'
import {
  Box,
  Button,
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
import { NavLink, useParams } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import EditIcon from '@mui/icons-material/Edit'
import { loadCategories } from '../../store/category/actions'
import { useSheetState } from '../../store/sheet/slice'
import { useTransactionState } from '../../store/transaction/slice'
import { useCategoryState } from '../../store/category/slice'
import { Transactions } from '../transaction/transactions'
import { SheetTypeLabel } from '../../constants/constants'
import { EditCategoriesDialog } from '../category/editCategoriesDialog'


export const SheetPage: FC = () => {
  const dispatch = useAppDispatch()
  const { sheetId } = useParams()
  const { sheets, loading } = useSheetState()
  const { loading: transactionLoading, totalAmount } = useTransactionState(sheetId)
  const { loading: categoryLoading } = useCategoryState()
  const sheet = sheets?.find(s => s._id === sheetId)

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)

  useEffect(() => {
    if (sheetId) {
      dispatch(loadCategories(sheetId))
    }
  }, [sheetId, dispatch])

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
                <NavLink to="edit">
                  <IconButton>
                    <EditIcon/>
                  </IconButton>
                </NavLink>
              </Box>
            </Box>
            <Box display="flex">
              <Typography variant="body2" alignSelf="center" color="text.secondary">
                Список создан {formatDateRelative(sheet.createdAt)}
              </Typography>
            </Box>
          </Box>

          <CardContent sx={{ ml: 6 }}>
            <Typography color="text.secondary">
              {sheet.description}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography mr={3} variant="h5" fontWeight="lighter" color={totalAmount >= 0 ? 'green' : 'error'}>
                {totalAmount.toLocaleString()} ₽
              </Typography>
              <Button onClick={() => setCategoryDialogOpen(true)}>Категории</Button>
              <EditCategoriesDialog open={categoryDialogOpen} onClose={() => setCategoryDialogOpen(false)}/>
            </Box>
          </CardContent>
        </Container>
        {(transactionLoading || categoryLoading) && <LinearProgress/>}
      </Card>

      <Transactions sheetId={sheetId}/>
    </Box>
  )
}
