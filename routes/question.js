const router = require("express").Router();
const Question = require("../models/questions.js");
const Responses = require("../models/responses.js");
const multer = require('multer');
const path = require('path');
const {validateToken} = require('./JWT')


//for document upload
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|xls|xlsx|jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Only pdf, excel and images allowed!');
    }
  }
});

router.get('/get',validateToken, async (req, res) => {
    try {
      const questions = await Question.find({});
      const responseFormat = questions.map(question => {
        return {
          id: question._id, 
          layout: question.layout,
          title: question.title,
          type: question.type,
          label: question.label,
          fields: question.fields
        };
      });

      res.send(responseFormat);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });
  
  //Endpoint to add a new question to the database
  router.post('/post',validateToken, async (req, res) => {
    try {
  
     // console.log(req.body)
      const newQuestion = new Question({
        layout: req.body.layout,  
        title: req.body.title,
        type: req.body.type,
        label: req.body.label,
        fields: req.body.fields
      });
  
    
      const savedQuestion = await newQuestion.save();
  
    
      res.send(`Question ${savedQuestion.title} added to database successfully`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });
  
  // Endpoint to attach documents to a question
router.post('/:id/documents', upload.single('document'),validateToken, async(req, res) => {

  try{
    const questionId = req.params.id;
  const documentUrl = req.file.path;
  //console.log(documentUrl)
  const question = await Question.findOne({ _id: questionId });
  const resp = await Responses.findOne({question_id: questionId})
  resp.document = documentUrl
  await resp.save() 
  question.response.response_value = resp.value
  question.response.response_document = resp.document    
  await question.save();
  res.send(`Document attached to question ${questionId}: ${documentUrl}`);
}catch(err){
  console.error(err);
  res.status(500).send('Internal server error');
}});

module.exports = router;