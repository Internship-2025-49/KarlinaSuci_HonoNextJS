//import hono
import { Hono } from 'hono';
import { createPost, deletePost, getPostById, getPosts, updatePost } from '../controller/PostControllers';
import { basicAuth } from 'hono/basic-auth'
import { jwt } from 'hono/jwt'
import type { JwtVariables } from 'hono/jwt'

type Variables = JwtVariables
const router = new Hono<{ Variables: Variables }>()

router.use(
  '/auth/*',
  basicAuth({
    username: 'hono',
    password: 'acoolproject',
  })
)

router.get('/auth/page', (c) => {
  return c.text('You are authorized')
})


router.use(
  '/user/*',
  jwt({
    secret: 'it-is-very-secret',
  })
)

router.get('/user/page', (c) => {
  return c.text('You are authorized')
})

//routes posts index
router.get('/', (c) => getPosts(c));

//routes posts create
router.post('/', (c) => createPost(c));

//routes posts detail
router.get('/:id', (c) => getPostById(c));

//route post update
router.patch('/:id', (c) => updatePost(c));

//route post delete
router.delete('/:id', (c) => deletePost(c));

export const Routes = router;