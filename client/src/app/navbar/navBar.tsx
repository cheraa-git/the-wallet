import { FC } from 'react'
import './styles.css'
import { NavBarMenu } from './navBarMenu'
import { Link } from 'react-router-dom'
import { Box, LinearProgress, Typography } from '@mui/material'
import AppLogo from '../../assets/app-logo.png'
import { useApp } from '../../store/app/useState'

export const NavBar: FC = () => {
  const { loading, isDark } = useApp()
  return (
    <>
      <div className={`navbar ${isDark && 'navbar_dark'} border-b`}>
        <div>
          <Box minWidth={50} display="flex">
            <Link to="/" className="flex">
              <img src={AppLogo} alt="collections-logo" width={50} height={50}/>
              <Typography variant="h5" alignSelf="center" hidden={window.innerWidth < 500}>The wallet</Typography>
            </Link>
          </Box>
          <Box ml="auto" display="flex">
            <NavBarMenu/>
          </Box>
        </div>
      </div>
      <Box>
        {loading && <LinearProgress/>}
      </Box>
    </>
  )
}
