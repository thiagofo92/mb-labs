import Express from 'express'
import { Routers } from '../routers/routers'

const app = Express()
const router = new Routers(Express.Router())
app.use(Express.json())

app.use(router.build())
export { app }
