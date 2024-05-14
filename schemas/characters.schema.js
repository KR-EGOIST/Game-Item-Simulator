import mongoose from 'mongoose';

const myCharacterSchema = new mongoose.Schema(
  {
    character_id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    health: {
      type: Number,
      required: true,
    },
    power: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('myCharacter', myCharacterSchema);
