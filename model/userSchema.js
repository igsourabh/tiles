import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  image: {
    type: String,
    default:
      "https://www.seekpng.com/png/detail/115-1150053_avatar-png-transparent-png-royalty-free-default-user.png",
  },
  category: {
    type: String,
    enum: ["student", "teacher", "lawyer"],
    default: "student",
  },
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  phone: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "publisher"],
    default: "user",
  },
  verified: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },

  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [6, "Password length must be more than 5 characters"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("user", UserSchema);
