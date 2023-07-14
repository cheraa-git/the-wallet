import { FC } from 'react'
import { useParams } from 'react-router-dom'

export const EditTransactionPage: FC = () => {
  const { transactionId } = useParams()
  return (
    <div>
      EditTransactionPage
      transactionId: {transactionId}
    </div>
  )
}
