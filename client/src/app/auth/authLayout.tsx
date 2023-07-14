import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'


export const AuthLayout: FC = () => {
  return (
    <Box width="max-content" px={8} py={3} mx="auto" mt={8} className="rounded border">
      <Outlet/>
    </Box>

  )
}
