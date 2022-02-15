const { model, Schema } = require('mongoose');

const User = new Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    role: {
      type: String,
      required: [true, 'role is required'],
      enum: {
        values: ['normal', 'admin', 'editor', 'manager'],
        message:
          "user role should be equal to one of these 'normal', 'admin', 'editor', 'manager'",
      },
      default: 'normal',
    },
    type: {
      type: String,
      required: [true, 'type is required'],
      enum: {
        values: ['normal', 'org'],
        message: "user type should be equal to one of these 'normal', 'org'",
      },
      default: 'normal',
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'projects',
      },
    ],
    donations: [
      {
        projectID: { type: Schema.Types.ObjectId, ref: 'projects' },
        timestamp: Date,
        amount: Number,
        _id: false,
      },
    ],
    provider: {
      type: String,
      default: 'classic',
    },
    providerId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = model('users', User);
