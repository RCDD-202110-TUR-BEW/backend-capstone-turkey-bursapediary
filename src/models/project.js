const { model, Schema } = require('mongoose');

const Project = new Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    amount: {
      type: Number,
      required: [true, 'amount is required'],
    },
    collectedAmount: {
      type: Number,
      required: [true, 'collected amount is required'],
      default: 0,
    },
    isDone: {
      type: Boolean,
      required: [true, 'isDone is required'],
      default: false,
    },
    isExpired: {
      type: Boolean,
      required: [true, 'isExpired is required'],
      default: false,
    },
    owners: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
    supporters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
    donations: [
      {
        type: {
          amount: Number,
          userID: Schema.Types.ObjectId,
          timestamp: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('projects', Project);
