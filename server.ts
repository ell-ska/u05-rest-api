import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}/`)
})
