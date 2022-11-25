import mongoose from "mongoose";

const user = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});
const User = mongoose.model("user", user, "user");
export default User;
