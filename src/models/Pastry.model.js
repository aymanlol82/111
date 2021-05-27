import mongoose from 'mongoose'

const {Schema}  = mongoose

const pastrySchema = new Schema({
    productsname: {
       type: String,
       unique: true,
       required: true  
    },
    quantity: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    ingredient: String,
    imageURL:String



},{ timestamps: true, versionKey: false, autoIndex: true })


const PastryModel = mongoose.model('pastry', pastrySchema);

export default PastryModel