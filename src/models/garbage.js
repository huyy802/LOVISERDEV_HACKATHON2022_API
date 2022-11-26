import mongoose from "mongoose";

const garbage = new mongoose.Schema({
  url: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  price:{
    required: true,
    type: Number,
  },
  description:{
    type: String,
  },
});
const Garbage = mongoose.model("garbage", garbage, "garbage");
export default Garbage;
