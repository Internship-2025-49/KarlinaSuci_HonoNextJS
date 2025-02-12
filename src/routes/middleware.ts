import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { basicAuth } from 'hono/basic-auth'
import { createMiddleware } from 'hono/factory'
const app = new Hono()


app.use(poweredBy())


app.use(
  '/admin/*',
  basicAuth({
    username: 'admin',
    password: 'duar',
  })
)

app.get('/admin', (c) => {
  return c.text('You are authorized!')
})

app.use(async (_, next) => {
    console.log('middleware 1 start')
    await next()
    console.log('middleware 1 end')
  })
  app.use(async (_, next) => {
    console.log('middleware 2 start')
    await next()
    console.log('middleware 2 end')
  })
  app.use(async (_, next) => {
    console.log('middleware 3 start')
    await next()
    console.log('middleware 3 end')
  })
  
  app.get('/', (c) => {
    console.log('handler')
    return c.text('Hello!')
  })

  // Custom logger
app.use(async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`)
  await next()
})

// Add a custom header
app.use('/message/*', async (c, next) => {
  await next()
  c.header('x-message', 'This is middleware!')
})

app.get('/message/hello', (c) => c.text('Hello Middleware!'))



const echoMiddleware = createMiddleware<{
  Variables: {
    echo: (str: string) => string
  }
}>(async (c, next) => {
  c.set('echo', (str) => str)
  await next()
})

app.get('/echo', echoMiddleware, (c) => {
  return c.text(c.var.echo('Hello!'))
})

  export default app;