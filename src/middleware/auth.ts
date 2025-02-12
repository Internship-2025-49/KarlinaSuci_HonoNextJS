import { Context, Next } from 'hono'
import prisma from '../../prisma/client'


export const apiKeyAuth = async (c: Context, next: Next) => {
    const apiKey = c.req.header('name-api-key')

    if (!apiKey) {
        return c.json({ success: false, message: 'Silahkan Masukan API key terlebih dahulu' }, 401)
    }

    const auth = await prisma.auth.findFirst({
        where: { key: apiKey }
    })

    if (!auth) {
        return c.json({ success: false, message: 'Maaf Api key salah' }, 401)
    }

    await next()
}