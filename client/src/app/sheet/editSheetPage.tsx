import { FC } from 'react'
import { useParams } from 'react-router-dom'

export const EditSheetPage: FC = () => {
  const { sheetId } = useParams()
  return (
    <div>
      EditSheetPage
      sheetId: {sheetId}
    </div>
  )
}
