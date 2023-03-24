const router = require("express").Router();
const Responses = require("../models/responses.js");
const {validateToken} = require('./JWT')
router.get('/get',validateToken, async (req, res) => {
    try {
      
     // console.log(req.body)
     const responses = await Responses.find({});
     const responseFormat = responses.map(response => {
       return {
        question_id: response.question_id,
        answer: response.value,
        document_attached: response.document
       };
     });
     res.send(responseFormat);
   } catch (err) {
     console.error(err);
     res.status(500).send('Internal server error');
   }
  });
  
  
  router.post('/post',validateToken, async (req, res) => {
    try {
      
     // console.log(req.body)
      const newResponse = new Responses({
       question_id: req.body.question_id,
       value: req.body.value
      });
  
      const savedResponse = await newResponse.save();

      res.send(`Value ${savedResponse.value} added to database successfully`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });
  
module.exports = router;