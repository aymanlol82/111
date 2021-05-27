import StatusCode from '../configurations/StatusCode.js'
import PastryModel from '../models/Pastry.model.js'


const createProducts = async (request, response) => {
    const pastry = new PastryModel ( {
        productsname: request.body.productsname,
        quantity: request.body.quantity,
        available: request.body.available,
        ingredient: request.body.ingredient,
        imageURL: request.body.imageURL
    })
    try{
        const databasResponse = await pastry.save()
        response.status(StatusCode.CREATED).send(databasResponse)
    } catch(error) {
        response.status(StatusCode.INTENAL_RSERVER_ERROR).send({message: error.message})

    }
}
const getAllData = async( request, response ) => {
    try{
        const databasResponse = await PastryModel.find()
        response.status(StatusCode.OK).send(databasResponse)
    } catch (error) {
        response.status(StatusCode.INTENAL_RSERVER_ERROR).send({message: error.message})

    }
}

const updateData = async(request,response) => {
    const updatePastry ={
        productsname: request.body.productsname,
        quantity: request.body.quantity,
        available: request.body.available,
        ingredient: request.body.ingredient,
        imageURL: request.body.imageURL
    }
    try{
        if (!request.body.productsname) {
            return response.status(StatusCode.BAD_REQUEST).send({message : 'empty values are not valid'})
        }
        const databasResponse = await PastryModel.findByIdAndUpdate(request.params.id  , updatePastry , {new: true})
        response.status(StatusCode.OK).send(databasResponse)
    }catch(error) {
        response.status(StatusCode.INTENAL_RSERVER_ERROR).send({message: `Error occured while trying to update user with id : ${request.params.id} Not found`})
    }
}

const deleteData = async (request,response) => {
    try{
        const databasResponse = await PastryModel.findByIdAndDelete(request.params.id)
        response.status(StatusCode.OK).send({message: `Sucessfuly deleted the product  : ${databasResponse.productsname}`})
    } catch (error) {
        response.status(StatusCode.INTENAL_RSERVER_ERROR).send({message:`Error occured while trying to delete user with id : ${request.params.id} Not found`})
    }
}

export default {
    createProducts,
    getAllData,
    updateData,
    deleteData
}