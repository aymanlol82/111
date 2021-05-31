import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import Middlewares from './src/middlewares/Middlewares.js'
import Configurations from './src/configurations/Configurations.js'
import routes from './src/routes/route.js'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'


const app = express()
app.use(cors())
app.use(express.json())

app.use(helmet())
app.use(morgan('common',))

mongoose.connect(
    process.env.MONOGODB_URI || "mongodb://localhost:27017/backendproject",
    {useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true}, () => {
        console.log('   ✔️     Successfuly connected to the databas.. ')
    }
)

routes.pastryRoute(app)
routes.userRoute(app)

const PORT = process.env.PORT || 8080

if (process.env.NODE_ENV ==='production') {
    app.use(express.static('bakverkproject/build'))
}

//app.use(express.static('bakverkproject/build'))

/*app.get('*', (req, res) => {
    res.sendFile(path.join('bakverkproject/build/index.html'))
})*/

app.listen (PORT , () => {
    console.log(`   ✔️   Server running on port : ${PORT} `)
})    




//app.use(Middlewares.notFound)

//Configurations.connectToPort(app)
//Configurations.connectToDatabas()

export default app



