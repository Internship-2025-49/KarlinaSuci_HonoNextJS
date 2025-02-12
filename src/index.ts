import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { Routes } from './routes'
import { cors } from 'hono/cors'
import middleware from './routes/middleware'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')

app.use('*', cors({
  origin: 'http://localhost:3000',
  allowMethods: ['GET','POST', 'PUT', 'DELETE'], 
  allowHeaders: ["*"],
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/posts', Routes)
app.route('/middleware',middleware)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})


export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
export type AppType = typeof app
