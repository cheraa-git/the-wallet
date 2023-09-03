import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'
import Image from 'mui-image'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useAuthState } from '../../store/auth/slice'
import { EditUserMenu } from './editUserMenu'


export const UserPage: FC = () => {
  const navigate = useNavigate()
  const { currentUser, profileLoading } = useAuthState()

  useEffect(() => {
    if (!profileLoading && !currentUser) {
      navigate('/auth/login')
    }
  }, [profileLoading, currentUser, navigate])

  if (profileLoading) return <Box display="flex" justifyContent="center" mt={3}><CircularProgress/></Box>
  if (!currentUser) return <></>
  return (
    <Box display="flex" flexWrap="wrap" mb={1} p={2} className="flex bg-gray border">
      <Image
        src={currentUser?.avatar || ''}
        errorIcon={<Box fontSize="100px" height={120}><AccountCircleIcon color="disabled" fontSize="inherit"/></Box>}
        showLoading width={200} height={200} className="rounded"/>
      <Box>
        <Box ml={1} mb={1}>
          <Typography color="gray">Имя</Typography>
          <Typography fontSize="x-large" className="capitalize" ml={2} mr={1}>
            {currentUser.name} {currentUser.surname}
          </Typography>
        </Box>
        <Box ml={1}>
          <Typography color="gray">Email</Typography>
          <Typography fontSize="x-large" ml={2} mr={1}>{currentUser.email}</Typography>
        </Box>

      </Box>

      <Box ml="auto" display="flex" flexDirection="column" justifyContent="space-between">
        <Box ml="auto">
          <EditUserMenu/>
        </Box>
      </Box>
    </Box>
  )
}
