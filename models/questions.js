const mongoose = require("mongoose");
const Responses = require("./responses")
// Define the question schema
const questionSchema = new mongoose.Schema({
    layout: String,
    title: String,
    type: String,
    label: String,
    fields: [{
        field_lable:String,
        field_type: String || Number,
        field_options: [String]
    }],
    response: {
        response_value :String,
        response_document: String
    }

  });
  
 
  
  module.exports=mongoose.model("Question",questionSchema);
