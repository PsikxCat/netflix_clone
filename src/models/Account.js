import mongoose from 'mongoose'

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true
  },
  uid: {
    type: String,
    required: [true, 'UID is required.'],
    trim: true
  },
  pin: {
    type: String,
    required: [true, 'PIN is required.'],
    trim: true
  },
},
{ timestamps: true })

const Account = mongoose.models.Account || mongoose.model('Account', AccountSchema)

export default Account
