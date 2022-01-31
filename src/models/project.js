const { model, Schema } = require('mongoose');

const Comment = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  }, 
  content : String,
  },
  { timestamps: true }
);

const Review = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  }, 
  rating: {
    type: Number,
    enum : [1, 2, 3, 4, 5,],
  },
  content : String,
  },
  { timestamps: true }
);

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
    comments: [Comment],
    reviews: [Review],
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
  },
  { timestamps: true }
);

module.exports = model('projects', Project);
