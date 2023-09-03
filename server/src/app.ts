import express from 'express'
import chalk from 'chalk'
import dotenv from 'dotenv'
import * as mongoose from 'mongoose'
import routes from './routes'
import cors from 'cors'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/api', routes)

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI || '')
    console.log(chalk.green('MongoDB connected'))
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}...`))
    })
  } catch (error: any) {
    console.log(chalk.red(error.message))
    process.exit(1)
  }

}

start()
