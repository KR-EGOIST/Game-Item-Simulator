import mongoose from 'mongoose';

// ObjectId 타입은 따로 꺼내주어야 한다.
const {
  Types: { ObjectId },
} = mongoose.Schema;

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
    equip: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('myCharacter', myCharacterSchema);
