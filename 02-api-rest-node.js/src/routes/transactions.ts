import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { checkSessinIdExists } from '../middewares/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  //   app.addHook('preHandler', async (request, reply) => {
  //     console.log('teste aqui')
  //   })
  app.get(
    '/summary',
    {
      preHandler: [checkSessinIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies
      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', {
          as: 'amount',
        })
        .first()
      return { summary }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessinIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = getTransactionParamsSchema.parse(request.params)
      const transaction = await knex('transactions')
        .where({
          session_id: sessionId,
          id,
        })
        .first()
      return { transaction }
    },
  )

  app.get(
    '/',
    {
      preHandler: [checkSessinIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies
      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()
      return { transactions }
    },
  )

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )
    let sessionId = request.cookies.sessionId
    if (!sessionId) {
      sessionId = randomUUID()
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })
    return reply.status(201).send()
  })
}
