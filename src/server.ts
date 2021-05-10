import express from 'express'

import './config.ts'
import routes from './routes'

const app = express()

app.use(express.json())
app.use(routes)

app.listen(process.env.PORT, () => console.log('Server is running...'))