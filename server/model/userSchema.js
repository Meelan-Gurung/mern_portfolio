const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  work: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpassword: {
    type: String,
    required: true
  },
  tokens:[{
    tokke: {
      type: String,
      required: true
    }
}]
    
})


//hashing the password
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    //current password
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);

  }

  next();
});

//generating auth token
userSchema.methods.generateAuthToken = async function (){
  try {
    let tok = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({tokke: tok});
    await this.save();
    return tok;
  } catch (error) {
    
  }
}


const user = mongoose.model('REG', userSchema);

module.exports = user;