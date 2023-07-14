import { FC, MouseEvent, useState } from 'react'
import { Box, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { MenuSettings } from './MenuSettings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddIcon from '@mui/icons-material/Add'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import PersonAddIcon from '@mui/icons-material/PersonAdd'


export const NavBarMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const currentUser = { nickname: 'Александр', id: '1234sdf' }
  const isAuth = true


  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const logoutHandler = () => {
    handleClose()
    // logout()
  }


  return (
    <>
      <IconButton onClick={handleClick} sx={{ ml: 2 }}>
        <MenuIcon color="primary"/>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >

        <Box hidden={!isAuth}>
          <Link to={`/user/${currentUser.id}`} onClick={handleClose}>
            <MenuItem>
              <AccountCircleIcon color="primary"/>
              <Typography ml={2} className="capitalize">{currentUser.nickname}</Typography>
            </MenuItem>
          </Link>

          <Link to="/sheets" onClick={handleClose}>
            <MenuItem>
              <AddIcon color="primary"/>
              <Typography ml={2}>списки</Typography>
            </MenuItem>
          </Link>
          <MenuItem onClick={logoutHandler}>
            <LogoutIcon color="primary"/>
            <Typography ml={2}>Выйти</Typography>
          </MenuItem>
        </Box>

        <Box hidden={isAuth}>
          <Link to="/auth/login">
            <MenuItem onClick={handleClose}>
              <Typography>Login</Typography>
              <LoginIcon sx={{ ml: 4 }} color="primary" fontSize="small"/>
            </MenuItem>
          </Link>
          <Link to="/auth/signup">
            <MenuItem onClick={handleClose}>
              <Typography>Sign up</Typography>
              <PersonAddIcon sx={{ ml: 2 }} color="primary" fontSize="small"/>
            </MenuItem>
          </Link>
        </Box>

        <Divider/>

        <MenuSettings/>
      </Menu>
    </>
  )
}
