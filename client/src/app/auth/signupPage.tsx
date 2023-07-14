import { FC } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { useAppDispatch } from '../../store/store'
import { signup } from '../../store/auth/actions'

interface Inputs {
  email: string
  password: string
  confirmPassword: string
  name: string
  surname: string
}

export const SignupPage: FC = () => {
  const dispatch = useAppDispatch()
  const { enqueueSnackbar: snackbar } = useSnackbar()
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = ({ email, password, name, confirmPassword, surname }) => {
    if (!email.includes('@')) return snackbar('Email is invalid')
    if (confirmPassword !== password) return snackbar('The password is not equal to the confirm password')
    dispatch(signup({ email, password, name, surname }))
  }
  return (
    <>
      <Box mb={2} textAlign="center">
        <Typography variant="h4" mb={1}>Регистрация</Typography>
      </Box>
      <Box component="form" width={300} onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth label="Имя" {...register('name', { required: true })}
                   error={!!errors.name}
                   variant="standard"
                   margin="normal"/>
        <TextField fullWidth label="Фамилия" {...register('surname', { required: true })}
                   error={!!errors.surname}
                   variant="standard"
                   margin="normal"/>
        <TextField fullWidth label="Email" {...register('email', { required: true })} error={!!errors.email}
                   variant="standard"
                   margin="normal"/>
        <TextField fullWidth label="Пароль" {...register('password', { required: true })}
                   error={!!errors.password}
                   variant="standard"
                   type="password"
                   margin="normal"
                   autoComplete="off"/>
        <TextField fullWidth label="Введите пароль еще раз" {...register('confirmPassword', { required: true })}
                   variant="standard"
                   error={!!errors.confirmPassword}
                   type="password"
                   margin="normal"
                   autoComplete="off"/>
        <Box ml="auto" mt={1} width="min-content">
          <Button variant="outlined" type="submit">Зарегистрироваться</Button>
        </Box>
      </Box>
      <Box display="flex" mt={2}>
        <Typography fontSize="medium">Уже есть аккаунт?</Typography>
        <Link to="/auth/login" className="link">
          <Typography fontSize="medium" ml={1}>Войти</Typography>
        </Link>
      </Box>
    </>
  )
}
