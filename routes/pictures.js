var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg');
  }
})

// var upload = multer({ storage: storage });
var upload = multer({ storage: storage }).single('avatar');

router.get('/', function( req, res, next ) {
  res.render('upload', { title: 'Pictures' });
});

router.post('/upload', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,authorization');
  upload(req, res, function (err) {
      if (err) {
          console.log('err >>> ', err)
          return
      }
      console.log('res >>> ', req.body)
      var reqContent = 'OK<br>req.body:<pre>' + JSON.stringify(req.body) + '</pre><br><br>file info:<pre>'+ JSON.stringify(req.file)+'</pre>';
      res.send(reqContent);
      // console.log( req.body );
      // res.send(req.body);
  })

  // for (var pair of req.body.entries()) {
  //     console.log(pair[0]+ ', ' + pair[1]);
  // }
  // console.log( req.body );
  // res.render('upload', { title: 'Pictures' });
})


module.exports = router;