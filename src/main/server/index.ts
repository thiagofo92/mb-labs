import Express from 'express'
import { serve as SwaggerServer, setup as SwaggerSetUp } from 'swagger-ui-express'
import { Routers } from '../routers/routers'
import SwaggerConfig from './../routers/swagger/swagger-config.json'

const app = Express()
const router = new Routers(Express.Router())

app.use(Express.json())
app.use('/api-docs', SwaggerServer, SwaggerSetUp(SwaggerConfig))

app.use('/api', router.build.apply(router))
export { app }
