import { FC } from 'react'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useAppSelector } from '../../store/store'
import './styles.css'
import { Spinner } from '../../common/Loader/spinner'


export const SheetPage: FC = () => {
  const { sheets, loading } = useAppSelector(state => state.sheet)
  const sheet = sheets[0]
  if (loading) return <Spinner/>
  return (
    <Card>
      <CardMedia
        component="img"
        height="194"
        image="https://mui.com/static/images/cards/paella.jpg"
        alt="Paella dish"
      />

      <CardContent>
        <Typography variant="h5">
          {sheet.title}
        </Typography>
        <Typography color="text.secondary">
          {sheet.description}
        </Typography>
        <Typography className="sheet-card-date" variant="body2" color="text.secondary">
          Created: {sheet.createdAt}
        </Typography>
        <Typography className="sheet-card-date" variant="body2" color="text.secondary">
          Updated: {sheet.updatedAt}
        </Typography>
      </CardContent>
    </Card>
  )
}
