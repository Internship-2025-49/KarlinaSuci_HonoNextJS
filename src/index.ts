import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { Routes } from './routes'

const app = new Hono().basePath('/api')

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/posts', Routes)

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
