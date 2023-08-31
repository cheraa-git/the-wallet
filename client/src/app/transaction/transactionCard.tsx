import { FC } from 'react'
import { ITransaction } from '../../../../common/types/types'
import { Box, IconButton, Paper, Typography } from '@mui/material'
import { useCategoryState } from '../../store/category/slice'
import { formatDateRelative } from '../../utils/format'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

interface TransactionCardProps {
  transaction: ITransaction
}

export const TransactionCard: FC<TransactionCardProps> = ({ transaction }) => {
  const { selectCategoryById } = useCategoryState()
  const category = selectCategoryById(transaction.categoryId)

  return (
    <Paper variant="outlined" sx={{ mb: 2, px: 2 }}>
      <Box display="flex">
        <Box width="max-content" mr={1}>
          <Typography fontSize={16} color="text.secondary" lineHeight={1.2} alignSelf="center" width="max-content">
            {category?.name}
          </Typography>
          <Typography variant="h6" fontWeight="normal" color={transaction.type === 'expense' ? 'error' : 'green'}
                      width="max-content" alignSelf="center" mr={0}>
            {transaction.type === 'expense' ? '-' : '+'} {transaction.amount}
          </Typography>
          <Typography variant="caption" color="text.secondary" width="max-content">
            {formatDateRelative(transaction.updatedAt)}
          </Typography>
        </Box>

        <Box ml="auto" my="auto">
          <Typography alignSelf="center" mt={1} textAlign="end" lineHeight={1.5} fontSize={16}>
            {transaction.description}
          </Typography>
        </Box>

        <Box display="flex" height="min-content" my="auto">
          <IconButton>
            <EditIcon/>
          </IconButton>
          <IconButton color="error">
            <DeleteIcon/>
          </IconButton>
        </Box>

      </Box>
    </Paper>
  )
}
