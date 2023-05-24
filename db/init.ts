import sequelizeConnection from './config'
import { runAwardSeeds } from './seed'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = async () => {
  console.log("Initializing DB...")

  await sequelizeConnection.sync({
    alter: isDev
  })

  await runAwardSeeds()
}
export default dbInit 