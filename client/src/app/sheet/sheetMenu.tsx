import { FC, MouseEvent, useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { NavLink } from 'react-router-dom'


export const SheetMenu: FC = () => {
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
      <IconButton onClick={handleClick}><MoreVertIcon/></IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <NavLink to="edit">
          <MenuItem>Редактировать список</MenuItem>
        </NavLink>
        <MenuItem onClick={handleClose}>Изменить категории</MenuItem>
      </Menu>
    </div>
  )
}
