import express from 'express'
import { getPayloadClient } from './get-payload'
import { nextApp, nextHandler } from './next-utils'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './trpc'
import { inferAsyncReturnType } from '@trpc/server'

const app = express()
const PORT = Number(process.env.PORT) || 3000

const createContext = ({req,res}: trpcExpress.CreateExpressContextOptions) => ({req,res})

export type ExpressContext = inferAsyncReturnType<
    typeof createContext>

const start = async () => {
    const payload = await getPayloadClient({
        initOptions:{
            express: app,
            onInit: async (cms: any) =>{
                cms.logger.info(`Admin Url ${cms.getAdminURL}`)
            }
        }
    })

    app.use('/api/trpc', trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    }))

    // forward ke nextjs
    app.use((res,req)=> nextHandler(res,req))

    nextApp.prepare().then(() => {
        // payload.logger.info(`Next.js started`)

        app.listen(PORT, async () =>{
            // payload.logger.info(`Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`)
        })
    })

}

start()