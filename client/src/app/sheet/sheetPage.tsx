import { FC, useEffect } from 'react'
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Spinner } from '../../common/Loader/spinner'
import { formatDateRelative } from '../../utils/format'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { SheetMenu } from './sheetMenu'
import { loadCategories } from '../../store/category/actions'


export const SheetPage: FC = () => {
  const dispatch = useAppDispatch()
  const { sheetId } = useParams()
  const navigate = useNavigate()
  const { sheets, loading } = useAppSelector(state => state.sheet)
  const sheet = sheets?.find(s => s._id === sheetId)

  useEffect(() => {
    if (sheetId) {
      dispatch(loadCategories(sheetId))
    }
  }, [sheetId, dispatch])

  useEffect(() => {
    if (!loading && !sheet) {
      navigate('/sheets')
    }
  }, [sheet, loading, navigate])

  if (loading) return <Box display="flex" justifyContent="center" mt={5}><Spinner/></Box>
  if (!sheet) return <></>
  return (
    <Card sx={{ my: 2 }}>
      <Box display="flex" justifyContent="space-between" mx={2}>
        <Box display="flex">
          <NavLink to="/sheets">
            <IconButton color="primary"><ArrowBackIosIcon/></IconButton>
          </NavLink>
          <Typography variant="h5" alignSelf="center">
            {sheet.title}
          </Typography>
        </Box>
        <Box display="flex">
          <Typography variant="body2" alignSelf="center" color="text.secondary">
            Список создан {formatDateRelative(sheet.createdAt)}
          </Typography>
          <SheetMenu/>
        </Box>
      </Box>

      <CardContent sx={{ ml: 6 }}>
        <Typography color="text.secondary">
          {sheet.description}
        </Typography>
      </CardContent>
    </Card>
  )
}
