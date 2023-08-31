import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import { ISheet } from '../../../../common/types/types'
import { AmountStyled } from '../../common/amountStyled'
import { Box, Chip, Typography } from '@mui/material'
import { SheetTypeLabel } from '../../constants/constants'

export const SheetCard: FC<{ sheet: ISheet }> = ({ sheet }) => {
  const totalAmount = 45323
  return (
    <Box mb={2}>
      <Link to={`/sheets/${sheet._id}`}>
        <div className="sheet-card">
          <Box justifyContent="center" display="flex" flexDirection="column">
            <Box display="flex">
              <Typography className="capitalize-first" mr={2} alignSelf="center">{sheet.title}</Typography>
              <Chip label={SheetTypeLabel[sheet.type]} size="small"/>
            </Box>
            <AmountStyled amount={totalAmount} bold/>
          </Box>
          <div>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <AmountStyled amount={412344} fontSize={14} mr={1}/>
              <Typography fontSize={14} bgcolor="green" color="white" fontWeight="bold" px={1}>23</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <AmountStyled amount={-412344} fontSize={14} mr={1}/>
              <Typography fontSize={14} bgcolor="#ff6b6b" color="white" fontWeight="bold" px={1}>23</Typography>
            </Box>
          </div>
        </div>
      </Link>
    </Box>
  )
}
