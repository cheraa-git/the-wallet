import { FC } from 'react'
import { useParams } from 'react-router-dom'

export const SheetPage: FC = () => {
  const { sheetId } = useParams()
  return (
    <div>
      SheetPage
      sheetId: {sheetId}
    </div>
  )
}
