import { ChangeEvent, FC, useState } from 'react'
import { Box, Button, Dialog, MenuItem, Typography } from '@mui/material'
import { useAppDispatch } from '../../store/store'
import { useSnackbar } from 'notistack'
import { useAuthState } from '../../store/auth/slice'
import { MAX_IMAGE_SIZE } from '../../constants/constants'
import { ImageDrop } from '../../common/imageDrop/imageDrop'
import { editProfileImage } from '../../store/auth/actions'

export const EditUserImageMenuItem: FC = () => {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar: snackbar } = useSnackbar()
  const { currentUser } = useAuthState()
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<FileList | null>(null)
  const [existingImageUrl, setExistingImageUrl] = useState(currentUser?.avatar)
  const imageFile = image && image.length > 0 ? image[0] : undefined


  const onClose = () => {
    setOpen(false)
  }

  const clearImage = () => {
    setImage(new DataTransfer().files)
    setExistingImageUrl('')
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files)
    setExistingImageUrl('')
  }

  const editImageHandler = () => {
    if (existingImageUrl) return onClose()
    if (imageFile && imageFile?.size > MAX_IMAGE_SIZE) return snackbar('Максимальный размер фото 10MB')
    dispatch(editProfileImage(imageFile))
    onClose()
  }

  return (
    <div>
      <MenuItem onClick={() => setOpen(true)}>Изменить аватар</MenuItem>
      <Dialog open={open} onClose={onClose} fullWidth>
        <Box px={3} py={2}>
          <Typography variant="h5" mb={2}>Изменение аватара</Typography>
          <Box mb={2} width="min-content" mx="auto">
            <ImageDrop
              existingImageUrl={existingImageUrl}
              imageFile={imageFile}
              clearFile={clearImage}
              inputProps={{ onChange }}/>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Button onClick={onClose} color="inherit">Отмена</Button>
            <Button onClick={editImageHandler}>Сохранить</Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  )
}
