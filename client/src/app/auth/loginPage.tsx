import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../store/store'
import { login } from '../../store/auth/actions'


interface Inputs {
  email: string
  password: string
}

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    dispatch(login({ email, password }))
  }

  return (
    <>
      <Box mb={2} textAlign="center">
        <Typography variant="h4" mb={1}>Welcome!</Typography>
        <Typography>Войдите в ваш аккаунт</Typography>
      </Box>
      <Box component="form" width={300} onSubmit={handleSubmit(onSubmit)}>
        <TextField variant="standard" label="Email" fullWidth {...register('email', { required: true })}
                   error={!!errors.email}/>
        <TextField variant="standard" label="Пароль" fullWidth {...register('password', { required: true })}
                   error={!!errors.password}
                   type="password"
                   margin="normal"
                   autoComplete="on"/>
        <Box ml="auto" mt={1} width="min-content">
          <Button variant="outlined" type="submit">Войти</Button>
        </Box>
      </Box>
      <Box display="flex" mt={2}>
        <Typography fontSize="medium">Нет аккаунта?</Typography>
        <Link to="/auth/signup" className="link">
          <Typography fontSize="medium" ml={1}>Зарегистрироваться</Typography>
        </Link>
      </Box>
    </>
  )
}
