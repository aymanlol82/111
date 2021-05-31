import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import Middlewares from './src/middlewares/Middlewares.js'
import Configurations from './src/configurations/Configurations.js'
import routes from './src/routes/route.js'
import cors from 'cors'
import path from 'path'


const app = express()
app.use(cors({Credential: true}))
app.use(express.json())

app.use(helmet())
app.use(morgan('common',))


routes.pastryRoute(app)
routes.userRoute(app)


if (process.env.NODE_ENV ==='production') {
    app.use(express.static('bakverkproject/build'))
}

//app.use(express.static('bakverkproject/build'))

/*app.get('*', (req, res) => {
    res.sendFile(path.join('bakverkproject/build/index.html'))
})*/


//app.use(Middlewares.notFound)

Configurations.connectToPort(app)
Configurations.connectToDatabas()

export default app



