import UserModel from '../models/User.model.js'
import StatusCode from '../configurations/StatusCode.js'
//import bcrypt from 'bcrypt'


const createUser= async (request, response) => {

    /*const BCRYPT_SALT_ROUND = 10 
    const hashPassword = await bcrypt.hash(request.body.password,BCRYPT_SALT_ROUND)*/

    const user = new UserModel( {
        username: request.body.username,
        password: request.body.password //hashPassword
    })

    try {
        const databaseResponse = await user.save()
        response.status(StatusCode.CREATED).send(databaseResponse)
    } catch(error) {
        response.status(StatusCode.INTENAL_RSERVER_ERROR).send({message: error.message})
    }
}

const fetchAllUsers =async (request,response) => {
    try{
        const databaseResponse = await UserModel.find()
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTENAL_RSERVER_ERROR).send({message: error.message})
    }
}
const getUserByID = async (request,response) => {
    try{
        const databaseResponse = await UserModel.findOne({_id: request.params.userId})
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTENAL_RSERVER_ERROR).send({message: error.message})
    }
}

const deleteUserByID = async (request,response) => {
    try{
        const databaseResponse = await UserModel.findByIdAndDelete(request.params.userId)
        response.status(StatusCode.OK).send({
            message : `Sucessfuly deleted the user : ${databaseResponse.username}`
        })
    } catch (error) {
        response.status(StatusCode.INTENAL_RSERVER_ERROR).send({
            message : `Error occured while trying to delete user with id : ${request.params.userId}`,
            stackTrace : error.message
        })
    }
}

const updateUser = async (request,response) => {
    const data = {
        username: request.body.username,
        password: request.body.password
    }
    try{
        if (!request.body.username) {
            return response.status(StatusCode.BAD_REQUEST).send({message : 'empty values are not valid'})
        }
        const databaseResponse = await UserModel.findByIdAndUpdate(request.params.userId , data, {new: true})
        response.status(StatusCode.OK).send(databaseResponse)
    } catch (error) {
        response.status(StatusCode.INTENAL_RSERVER_ERROR).send({message: error.message})
    }
}

export default {
    createUser,
    fetchAllUsers,
    getUserByID,
    deleteUserByID,
    updateUser
}
