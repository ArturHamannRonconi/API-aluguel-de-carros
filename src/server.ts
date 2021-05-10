import './config.ts'
import express from 'express'

const app = express()

app.get('/', (req, res) => res.json({ message: 'Hello World!' }))

app.listen(process.env.PORT, () => console.log('Server is running...'))