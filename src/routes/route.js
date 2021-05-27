import PastryController from '../controllers/Pastry.controller.js'
import UserController from '../controllers/User.controller.js'

const pastryRoute = (app) => {
    app.post('/pastry' ,PastryController.createProducts )
    app.get('/pastry', PastryController.getAllData)
    app.put('/pastry/:id', PastryController.updateData)
    app.delete('/pastry/:id', PastryController.deleteData)
}

const userRoute = app => {
    app.post('/user' , UserController.createUser)
    app.get('/user', UserController.fetchAllUsers)
    app.get('/user/:userId', UserController.getUserByID)

}


export default {
    pastryRoute,
    userRoute
}