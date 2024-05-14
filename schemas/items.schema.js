import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    item_code: {
      type: Number,
      required: true,
      unique: true,
    },
    item_name: {
      type: String,
      required: true,
      unique: true,
    },
    item_stat: {
      health: { type: Number },
      power: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Item', itemSchema);
