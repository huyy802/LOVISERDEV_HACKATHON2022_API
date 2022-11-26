import mongoose from "mongoose";

const challenge = new mongoose.Schema({
    title: {
        required: true,
        type: String,
      },
    description:{
        required: true,
        type: String,
      },
    maximumParticipants:{
        require: true,
        type: Number,
    },
    address:{
        required: true,
        type: String,
    },
    startTime: {  
        type: Date,
        required: true,
    },
    endTime: {  
        type: Date,
        required: true,
    },
    participants: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
    }],
    images: [{
        type: String,
    }]
});
const Challenge = mongoose.model("challenge", challenge, "challenge");
export default Challenge;
