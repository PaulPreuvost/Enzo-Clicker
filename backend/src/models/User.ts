import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  cookies: { type: Number, default: 0 }
});

export default mongoose.model("User", UserSchema);