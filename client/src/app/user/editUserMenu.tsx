import { FC, MouseEvent, useState } from 'react'
import { Button, Menu } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { EditUserInfoMenuItem } from './editUserInfoMenuItem'
import { EditUserImageMenuItem } from './editUserImageMenuItem'

export const EditUserMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div>
      <Button onClick={handleClick}><EditIcon fontSize="small"/></Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <EditUserInfoMenuItem/>
        <EditUserImageMenuItem/>
      </Menu>
    </div>
  )
}
