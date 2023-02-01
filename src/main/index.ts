import { app } from './server'

const host = process.env.SERVER_HOST || '0.0.0.0'
const port = process.env.SERVER_PORT || '3000'

app.listen(Number(port), host, () => {
  console.log(`Server is on ${host}:${port}`)
})
