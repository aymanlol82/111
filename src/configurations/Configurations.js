import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
//const {PORT , DEV_DATABASE_URL , PROD_DATABASE_URL , ENVIRONMENT} = process.env

const PORT = process.env || 3030

const connectToPort = async (app) => {
    try{
        await app.listen (PORT , () => {
            console.log (`  ✔️     Server is running on port : ${PORT}`)
        })
    } catch (error) {
            console.log (`  ❌     Error , Server is not running on port : ${PORT}`)
    }
}

const connectToDatabas = async (app) => {
    //const DATABASE_URL = (ENVIRONMENT === 'DEVELOPMENT') ? DEV_DATABASE_URL : PROD_DATABASE_URL
      const DATABASE_URL = process.env.MONOGDB_URL || 'mongodb://localhost/backendproject'
    try{
        await mongoose.connect(DATABASE_URL, {useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true})
        console.log('   ✔️     Successfuly connected to the databas.. ')
    } catch (error) {
        console.log('   ❌     Error while trying to connect to the databas: ' + error)
        process.exit()
    }
} 


export default {
    connectToPort,
    connectToDatabas
}