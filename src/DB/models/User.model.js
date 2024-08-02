import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({

    firstName: {
        type: String,
        required: [true, 'username is required'],
        min: [2, 'minimum length 2 characters'],
        max: [2, 'maximum length 20 characters'],

    },
    lastName: {
        type: String,
        required: [true, 'username is required'],
        min: [2, 'minimum length 2 characters'],
        max: [2, 'maximum length 20 characters'],

    },
    email: {
        type: String,
        unique: [true, ' email must be unique'],
        required: [true, 'email is required'],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    recoveryEmail: {
        type: String,
        lowercase: true
    },
    role: {
        type: String,
        default: 'User',
        enum: ['Company_HR', 'User']

    },
    username: {

        type: String,
        min: [2, 'minimum length 2 characters'],
        max: [2, 'maximum length 20 characters']

    },
    status: {
        type: String,
        default: 'Offline',
        enum: ['Offline', 'Online']

    },
    confirmEmail: {

        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },

    DOB: String,
    code: String,
    applicationId: {
        type: Types.ObjectId,
        ref: 'Application'
    }

},
    {
        timestamps: true
    })

userSchema.pre('save', function (next) {
    this.username = this.firstName + this.lastName
    next()
})

const userModel = model("User", userSchema)

export default userModel