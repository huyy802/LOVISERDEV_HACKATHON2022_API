import OrderModel from "../models/Order.js";

export const OrderController = {
  //Region get all Order
  getAll: async (req, res) => {
    try {
     console.log(req.body);
      const Order = await OrderModel
       .find(req.body)
    //    const Order = await OrderModel.aggregate([
    //     {
    //       $project: {
    //         "date": {
    //           "$dateToString": {
    //             "format": "%m/%d/%Y %H:%M:%S",
    //             "date": "$timeOrder",
    //             "timezone": "GMT"
    //           }
    //         }
    //       }
    //     }
    //   ])
            
      console.log(Order);
      res.status(200).json({
        success: true,
        message: Order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when get all Order",
      });
    }
  },

  //GET An Order
  get: async (req, res) => {
    try {
      const Order = await OrderModel.findById(req.params.id);
      res.status(200).json({
        success: true,
        message: Order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when get an Order",
      });
    }
  },

  //DELETE
  delete: async (req, res) => {
    try {
      await OrderModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: OrderModel,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when delete Order",
      });
    }
  },

  //UPDATE
  update: async (req, res) => {
    try {
      const Order = await OrderModel.findById(req.params.id);
      await Order.updateOne({ $set: req.body });
      res.status(200).json("Update Successful!");
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when update Order",
      });
    }
  },

  //End region
  //Region add new Order
  create: async (req, res) => {
    try {  
      await OrderModel.create(req.body);
      return res.status(200).json({  success: true, message: "Order created" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //End region
 
};