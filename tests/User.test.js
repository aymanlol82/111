import Chai from 'chai'
import ChaiHTTP from 'chai-http'
import {describe , it as test}  from 'mocha'
import app from '../index.js'
import UserModel from '../src/models/User.model.js'

Chai.should()
Chai.use(ChaiHTTP)

const randomString = Math.random().toString(36).substring(7)

const testingNonExistentRoute = () => {
    test('Expecting 404 NOT_FOUND', done => {
        Chai.request(app)
            .get(`/${randomString}`)
            .end((request,response) => {
                response.should.have.a.status(404)
                done()
            })
    })
}

const getAllUser = () => {
    test('Fetch(GET) all users from databas' , done => {
        Chai.request(app)
        .get('/user')
        .end((Request,response) => {
            response.should.have.status(200)
            response.body.should.be.a('array')
            response.body.length.should.be.eq(response.body.length)
            done()
        })   
    })
}
const createUser = () => {
    const mockaData = {
        username: randomString,
        password: randomString
    }
    test('Create(POST) method for user entity' , done => {
        Chai.request(app)
            .post('/user')
            .send(mockaData)
            .end((request,response) => {
                response.should.have.a.status(201)
                response.body.should.be.a('object')
                response.body.should.have.property('username').equal(mockaData.username)
                response.body.should.have.property('password').equal(mockaData.password)
                done()
            })
    })
}

const getAllUserId = () => {
    const mockaData = {
        username: randomString,
        password: randomString
    }
    test('Fetch(GET by Id) all users from databas' , done => {
        const user = new UserModel({ username: mockaData.username+'12', password: mockaData.password+'12'})
        user.save((err, book) => {
            Chai.request(app)
            .get('/user/'+ user.id)
            .send(user)
            .end((Request,response) => {
                response.should.have.status(200)
                response.body.should.be.a('object')
                response.body.should.have.property('username')
                response.body.should.have.property('password')
                response.body.should.have.property('_id').eql(user.id)
                done()
            })   
        })    
    })
}

const updateUser = () => {  
    const mockaData = {
        username: randomString,
        password: randomString
    }
    test('Update (PUT) method for user entity' , done => {
        const user = new UserModel({ username: "ayman", password: "ayman"})
        user.save((err, book) => {
            Chai.request(app)
                .put('/user/'+user.id)
                .send({ username: mockaData.username+'123', password: mockaData.password+'123'})
                .end((request,response) => {
                    response.should.have.a.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have.property('username')
                    response.body.should.have.property('password')
                    done()
                })    
        })        
    })    
}


const deleteUser = () => {  
    test('Delete (delete) method for user entity' , done => {
        const user = new UserModel({ username: "Arasto", password: "Arasto"})
        user.save((err, book) => {
            Chai.request(app)
                .delete('/user/'+user.id)
                .end((request,response) => {
                    response.should.have.a.status(200)
                    response.body.should.be.a('object')
                    done()
                })    
                
            })
    })        
}

describe ('TESTING THE USER API ROUTE' , () => {
    testingNonExistentRoute()
    getAllUser()
    createUser()
    getAllUserId()
    updateUser()
    deleteUser()

})