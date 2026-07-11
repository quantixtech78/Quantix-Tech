import 'dotenv/config'
import cors from 'cors'
import express, { Request, Response } from 'express'
import { MongoClient, ServerApiVersion } from 'mongodb'

const app = express()
const port = Number(process.env.PORT ?? 3001)
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017'
const dbName = process.env.MONGODB_DB ?? 'quantix'

app.use(cors())
app.use(express.json())

const client = new MongoClient(mongoUri, {
  serverApi: ServerApiVersion.v1,
})

let database = client.db(dbName)

app.get('/api/health', async (_req: Request, res: Response) => {
  try {
    await database.command({ ping: 1 })
    res.json({
      status: 'ok',
      service: 'quantix-backend',
      database: 'mongodb',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'MongoDB ping failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

app.post('/api/contact', async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body as {
    name?: string
    email?: string
    subject?: string
    message?: string
  }

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields are required',
    })
  }

  const result = await database.collection('contact_submissions').insertOne({
    name,
    email,
    subject,
    message,
    createdAt: new Date(),
  })

  return res.status(201).json({
    success: true,
    id: result.insertedId,
    message: 'Message saved successfully',
  })
})

const start = async () => {
  await client.connect()
  database = client.db(dbName)

  app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`)
    console.log(`Connected to MongoDB database: ${dbName}`)
  })
}

start().catch((error) => {
  console.error('Failed to start backend:', error)
  process.exit(1)
})
