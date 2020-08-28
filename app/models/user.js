const mongoose = require('mongoose')
const isEmail = require('validator/lib/isEmail')
const bcryptjs = require('bcryptjs')
const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 64
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value){
                return isEmail(value)
            },
            message:function(){
                return 'invalid emali formate'
            }
        }

    },
    password:{ 
        type:String, 
        required: true,
        minlength:8,
        maxlength:128 
    },
    role: {
        type: [String]
        //required: true
    }
})

userSchema.pre('save', function(next){
    const user = this
    bcryptjs.genSalt()
        .then((salt)=>{
            bcryptjs.hash(user.password,salt)
                .then((encrypt)=>{
                    user.password = encrypt
                    next()
                })
        })
    
})

const User = mongoose.model('User', userSchema)

module.exports = User