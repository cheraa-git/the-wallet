import { FC } from 'react'
import { Typography, TypographyProps } from '@mui/material'
import { numbToAbsMonetize } from '../utils/format'

interface AmountStyledProps extends TypographyProps {
  amount: number
  bold?: boolean
}

export const AmountStyled: FC<AmountStyledProps> = ({ amount, bold, ...props }) => {
  return (
    <Typography className={`${bold ? 'bold' : ''} amount_${amount >= 0 ? 'green' : 'red'}`} {...props}>
      {numbToAbsMonetize(amount)}
    </Typography>
  )
}
