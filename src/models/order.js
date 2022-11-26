import mongoose from "mongoose";

const order = new mongoose.Schema({
  timeOrder: {  
    type: Date,
    required: true,
  },
  status: {
    required: true,
    type: String,
  },
  type :{
    required: true,
    type: String,
  },
  address :{
    required: true,
    type: String,
  },
  user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const Order = mongoose.model("order", order, "order");
export default Order;
