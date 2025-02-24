import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    required: [true, "Name is required"],
    type: Schema.Types.String,
  },
  email: {
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    type: Schema.Types.String,
  },
  password: {
    required: false,
    type: Schema.Types.String,
  },
  avtar: {
    required: false,
    type: Schema.Types.String,
  },
  role: {
    required: true,
    type: Schema.Types.String,
    default: "User",
  },
  userRole: {
    type: String,
    // required: true,
  },
  password_reset_token: {
    required: false,
    type: Schema.Types.String,
    trim: true,
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
