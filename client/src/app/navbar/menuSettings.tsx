import { FC } from 'react'
import { Button, ButtonProps, Grid, ListItem, PaletteMode, Typography } from '@mui/material'
import { useAppDispatch } from '../../store/store'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useApp } from '../../store/app/useState'
import { setTheme } from '../../store/app/slice'


export const MenuSettings: FC = () => {
  const dispatch = useAppDispatch()
  const { theme } = useApp()


  const getThemeBtnProps = (currentTheme: PaletteMode): ButtonProps => {
    return {
      variant: currentTheme === theme ? 'outlined' : 'text',
      disabled: currentTheme === theme,
      onClick: () => dispatch(setTheme(currentTheme)),
      size: 'small',
      fullWidth: true,
      sx: { mx: 0.5 }
    }
  }

  return (
    <ListItem>
      <Grid container spacing={1} width="300px">
        <Grid item xs={3} alignSelf="center">
          <Typography fontWeight="bold" fontSize="small">тема</Typography>
        </Grid>
        <Grid item xs={9} display="flex">
          <Button {...getThemeBtnProps('dark')}>
            <DarkModeIcon fontSize="small" sx={{ mr: 0.5 }}/>
            Темная
          </Button>
          <Button {...getThemeBtnProps('light')}>
            <LightModeIcon fontSize="small"/>
            Светлая
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  )
}
