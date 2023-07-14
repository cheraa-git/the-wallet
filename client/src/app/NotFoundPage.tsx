import { useNavigate } from "react-router-dom"
import { Box, Button, Typography } from '@mui/material'
import { useApp } from '../store/app/slice'

export function NotFoundPage() {
  const navigate = useNavigate()
  const theme = useApp().theme
  const bgColor = theme === 'light' ? '#fff' : '#121212'
  const goBackPage = () => {
    navigate(-1)
  }
  return (
    <Box display="flex" alignItems="center" flexDirection="column" height="100vh">
      <Box position="relative" mb={6}>
        <Typography fontWeight="lighter" fontSize="240px" height="273px">404</Typography>
        <Typography position="absolute" bgcolor={bgColor} bottom={0} left="10%" right="10%" textAlign="center">
          THE PAGE CAN`T BE FOUND
        </Typography>
      </Box>
      <Button variant="contained" onClick={goBackPage} className="py-4">Go back page</Button>
    </Box>
  )
}
