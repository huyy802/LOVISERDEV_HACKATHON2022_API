import ChallengeModel from "../models/challenge.js";
import User from "../models/user.js";

export const ChallengeController = {
  //Region get all Challenge
  getAll: async (req, res) => {
    try {
     console.log(req.body);
      const Challenge = await ChallengeModel
       .find(req.body)
            
      console.log(Challenge);
      res.status(200).json({
        success: true,
        message: Challenge,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when get all Challenge",
      });
    }
  },

  //GET An Challenge
  get: async (req, res) => {
    try {
      const Challenge = await ChallengeModel.findById(req.params.id);
      res.status(200).json({
        success: true,
        message: Challenge,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when get an Challenge",
      });
    }
  },

  //DELETE
  delete: async (req, res) => {
    try {
      await ChallengeModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: ChallengeModel,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when delete Challenge",
      });
    }
  },

  //UPDATE
  update: async (req, res) => {
    try {
      const Challenge = await ChallengeModel.findById(req.params.id);
      await Challenge.updateOne({ $set: req.body });
      res.status(200).json("Update Successful!");
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when update Challenge",
      });
    }
  },

  //End region
  //Region add new Challenge
  create: async (req, res) => {
    try {  
      const Challenge = await ChallengeModel.create(req.body);
      //console.log(await Challenge.populate('user'));

      const user = await User.findById(req.body.user);
      user.Challenges.push(Challenge._id);

     // console.log(user);

      await user.save();

      //console.log(await user.populate('Challenges'));
   
      return res.status(200).json({  success: true, message: "Challenge created" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //End region
  
  //Region get Challenges of user
  getParticipantsOfChallenge: async (req, res) => {
    try {  
 
      const user = await User.findById(req.params.id);
    
      const user_with_Challenges = await user.populate('Challenges')
      
      return res.status(200).json({  
        success: true, 
        message: user_with_Challenges.Challenges 
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //end region
};
