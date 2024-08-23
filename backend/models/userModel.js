const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        min: [2, 'Name must be more than 2 characters'],
        max: [255, 'Name must be less than 255 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        trim: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email address'],
        min: [6, 'Email must be more than 6 characters'],
        max: [255, 'Email must be less than 255 characters']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        min: [6, 'Password must be more than 6 characters'],
        max: [50, 'Password must be less than 50 characters']
    },
    date: {
        type: Date,
        default: Date.now
    },
    phone: {
        type: String,
        default: '00000000',
        min: [8, 'Phone number must be 8 numbers'],
        max: [8, 'Phone number must be 8 numbers']
    },
    photo: {
        type: String,
        default: 'https://cloud.appwrite.io/v1/storage/buckets/6674294c002398cef982/files/66a198a800092f0aaad5/view?project=6672aca2001718c2b811&mode=admin'
    },
    bio: {
        type: String,
        default: ' ',
        max: [255, 'Bio must be less than 255 characters']
    },

}, {
    timestamps: true,
}); //creating a schema

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
}); //encrypting password before saving

const user = mongoose.model('User', userSchema);    //model name is User
module.exports = user;   //exporting the model