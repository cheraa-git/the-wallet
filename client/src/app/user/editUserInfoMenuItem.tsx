import { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../../store/store'
import { Box, Button, Dialog, MenuItem, TextField, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { useAuthState } from '../../store/auth/slice'
import { editProfileInfo } from '../../store/auth/actions'
import { EditProfileInfoBody } from '../../../../common/types/request/authRequestTypes'

interface Inputs {
  name: string
  surname: string
  email: string
  oldPassword: string
  newPassword: string
}

export const EditUserInfoMenuItem: FC = () => {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar: snackbar } = useSnackbar()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({})
  const { currentUser } = useAuthState()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open && currentUser) {
      reset({
        email: currentUser.email,
        name: currentUser.name,
        surname: currentUser.surname
      })
    } else setOpen(false)
  }, [open, currentUser, reset])

  const onClose = () => {
    setOpen(false)
  }

  const onSubmit: SubmitHandler<Inputs> = ({ email, name, surname, oldPassword, newPassword }) => {
    if (!currentUser) return
    const sendData: EditProfileInfoBody = { oldPassword, _id: currentUser._id }
    if (!email.includes('@')) return snackbar('Введите корректный email')
    if (email && email !== currentUser.email) sendData.email = email
    if (name && name !== currentUser.name) sendData.name = name
    if (surname && surname !== currentUser.surname) sendData.surname = surname
    if (newPassword) sendData.password = newPassword
    dispatch(editProfileInfo(sendData))
    onClose()
  }


  return (
    <>
      <MenuItem onClick={() => setOpen(true)}>Изменить информацию пользователя</MenuItem>
      <Dialog open={open} onClose={onClose} fullWidth>
        <Box component="form" px={3} py={1} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5">Edit profile</Typography>
          <TextField label="Имя" autoComplete="username" size="small" margin="dense"
                     fullWidth{...register('name')}/>
          <TextField label="Фамилия" autoComplete="username" size="small" margin="dense"
                     fullWidth{...register('surname')}/>

          <TextField label="Email" size="small" margin="dense" fullWidth{...register('email')}
                     error={!!errors.email}/>

          <TextField type="password" autoComplete="new-password" label="Новый пароль" size="small" margin="dense"
                     fullWidth{...register('newPassword')}/>

          <Typography mt={2}>Для изменения информации пользователя введите старый пароль</Typography>

          <TextField label="Старый пароль" type="password" size="small" margin="dense" autoComplete="new-password"
                     fullWidth{...register('oldPassword', { required: true })}
                     error={!!errors.oldPassword}/>

          <Box display="flex" justifyContent="space-between" mt={1}>
            <Button onClick={onClose} color="inherit">Отмена</Button>
            <Button type="submit">Сохранить</Button>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}
