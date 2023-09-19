import mongoose from 'mongoose'

const FavoriteSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: [true, 'UID is required.'],
  },
  accountID: {
    type: String,
    required: [true, 'Account ID is required.'],
  },
  mediaID: {
    type: Number,
    required: [true, 'Media ID is required.'],
  },
  type: {
    type: String,
    required: [true, 'Type is required.'],
  },
  backdrop_path: String,
  poster_path: String,
}, { timestamps: true })

const Favorite = mongoose.models.Favorite || mongoose.model('Favorite', FavoriteSchema)

export default Favorite
