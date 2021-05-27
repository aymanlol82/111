import StatusCode from '../configurations/StatusCode.js'


const notFound = (request,response,next) => {
    const error = new Error(`Not Found: ${request.originalUrl}`)
    response.status(StatusCode.NO_FOUND)
    next(error)
}

export default {notFound}