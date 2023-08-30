import { FC, useEffect } from 'react'
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material'
import { useAppSelector } from '../../store/store'
import './styles.css'
import { Spinner } from '../../common/Loader/spinner'
import { formatDateRelative } from '../../utils/format'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'


export const SheetPage: FC = () => {
  const { sheetId } = useParams()
  const navigate = useNavigate()
  const { sheets, loading } = useAppSelector(state => state.sheet)
  const sheet = sheets.find(s => s._id === sheetId)

  useEffect(() => {
    if (!loading && !sheet) {
      navigate('/sheets')
    }
  }, [sheet, loading])

  if (loading) return <Box display="flex" justifyContent="center" mt={5}><Spinner/></Box>
  if (!sheet) return <></>
  return (
    <Card>
      <Box display="flex" justifyContent="space-between" mx={2}>
        <Box display="flex">
          <NavLink to="/sheets">
            <IconButton color="primary"><ArrowBackIosIcon/></IconButton>
          </NavLink>
          <Typography variant="h5" alignSelf="center">
            {sheet.title}
          </Typography>
        </Box>
        <Typography variant="body2" alignSelf="center" color="text.secondary">
          Список создан {formatDateRelative(sheet.createdAt)}
        </Typography>
      </Box>

      <CardContent sx={{ ml: 6 }}>
        <Typography color="text.secondary">
          {sheet.description}
        </Typography>
      </CardContent>
    </Card>
  )
}
