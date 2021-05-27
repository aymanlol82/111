import mongoose from 'mongoose'

const {Schema} = mongoose

const userSchema = Schema({ 
    username: {
        type: String,
        unique: true,
        allowNull: false,
        reguired: true,
        lowercase: true,
        minlength: [5, 'username must be longer than 5 characters'],
        maxlength: [20, 'username is to long']
    },
    password: {
        type: String,
        reguired: true,
        allowNull: false
    }

},{ timestamps: true }
)

const UserModel = mongoose.model('users' , userSchema)
export default UserModel