import { Schema, model } from 'mongoose'

const userSchema: Schema = new Schema({
    createdAt: Date,
    updatedAt: Date,

    firstName: {
        type: String,
        default: '',
        required: true
    },

    lastName: {
        type: String,
        default: '',
        required: true
    },

    emailAddress: {
        type: String,
        default: '',
        required: true
    },

    password: {
        type: String,
        default: '',
        required: true
    }
})

export default model('User', userSchema)