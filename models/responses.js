const mongoose = require("mongoose");


 const responseSchema = new mongoose.Schema({
      question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      value: String,
      document: String

  });
 module.exports=mongoose.model("Responses",responseSchema);