var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");
const multer = require('multer');
var multerS3 = require('multer-s3')

const s3 = new AWS.S3 ({
	accessKeyId: 'your access key id',
	secretAccessKey : 'your accs key'
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'your-bucket-name',
    acl: 'public-read', //if you want the file with public access 
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', upload.single('archivo') ,function(req,res,next){

    console.log(req.file) //you can see all the information about the uploaded file

    console.log(req.body) //only i using this to show all the information in the form
  
    console.log(req.file.location) //this url, you can using to save in your database and call the image or file to your project 

  res.redirect('/')
})

module.exports = router;
