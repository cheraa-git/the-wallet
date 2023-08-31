import { FC } from 'react'
import { Dialog } from '@mui/material'

interface AddTransactionDialogProps {
  open: boolean
  onClose: () => void
  sheetId: string

}

export const AddTransactionDialog: FC<AddTransactionDialogProps> = ({ sheetId, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      AddTransactionDialog {sheetId}
    </Dialog>
  )
}
