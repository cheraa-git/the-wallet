import { FC, MouseEvent, useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { NavLink } from 'react-router-dom'
import { EditCategoriesDialog } from '../category/editCategoriesDialog'


export const SheetMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenCategory = () => {
    setCategoryDialogOpen(true)
    handleClose()
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
        <MenuItem onClick={handleOpenCategory}>Изменить категории</MenuItem>
      </Menu>
      <EditCategoriesDialog open={categoryDialogOpen} onClose={() => setCategoryDialogOpen(false)}/>
    </div>
  )
}
