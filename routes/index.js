var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Image.find({}, function (err, data) {
    res.render('index', {data: data, title: 'Express'});
  })
});
router.get('/category', function(req, res, next) {
  res.render('index', { title: 'Category' });
});
router.get('/hanoi', function(req, res, next) {
  res.render('category', { title: 'Ha Noi' });
});
router.get('/hcm', function(req, res, next) {
  res.render('category', { title: 'Ho Chi Minh' });
});
router.get('/foreign', function(req, res, next) {
  res.render('category', { title: 'Foreign' });
});
router.get('/delete', function(req, res, next) {
  Image.find({}, function (err, data) {
    res.render('delete', {data: data, title: 'Delete', message: ''});
  })
});

// buoc 1: khoi tao khung - Schema
var dbb = 'mongodb+srv://admin:m4s0sNJl074v2Sbg@cluster0.6ado7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoose = require("mongoose");
mongoose.connect(dbb);
var imageSchema = new mongoose.Schema({
  tenAnh: 'string',
  noiDung: 'string',
  linkAnh: 'string'
})
// buoc 2: lien ket Schema voi mongoDB qua mongoose
var Image = mongoose.model('image', imageSchema);

router.get('/add', function (req, res) {
  res.render('add', {title: 'Add', message:''});
})

router.get('/update', function (req, res) {
  Image.find({}, function (err, data) {
    res.render('update', {title: 'Update', message: '', data: data});
  })
})

router.get('/getAll', function (req, res) {
  Image.find({}, function (err, data) {
    res.send(data);
  })
})

router.post('/them', function (req, res) {

  var tenAnh = req.body.tenAnh
  var noiDung = req.body.noiDung
  var linkAnh = req.body.linkAnh

  // buoc 3: khoi tao image voi gia tri lay duoc
  const image = new Image({
    tenAnh: tenAnh,
    noiDung: noiDung,
    linkAnh: linkAnh
  })
  image.save(function (error) {
    res.send({title: error.message, message: mess})
  })
})

router.post('/addPic', function (req, res) {

  var tenAnh = req.body.tenAnh
  var noiDung = req.body.noiDung
  var linkAnh = req.body.linkAnh

  // buoc 3: khoi tao image voi gia tri lay duoc
  const image = new Image({
    tenAnh: tenAnh,
    noiDung: noiDung,
    linkAnh: linkAnh
  })
  image.save(function (error) {
    var mess;
    if (error == null) {
      mess = 'Added successfully'
    } else {
      mess = error
    }
    res.render('add', {title: 'Add', message: mess})
  })
})

router.post('/updatePic', function (req, res) {

  var _id = req.body._id
  var tenAnhMoi = req.body.tenAnhMoi
  var noiDungMoi = req.body.noiDungMoi
  var linkAnhMoi = req.body.linkAnhMoi

  Image.updateOne({_id: _id}, {
    tenAnh: tenAnhMoi,
    noiDung: noiDungMoi,
    linkAnh: linkAnhMoi
  }, function (error, data) {
    var mess;
    if (error == null) {
      mess = 'Updated Successfully !'
    } else {
      mess = error
    }
    res.render('update', {title: 'Update', message: mess, data: data})
  })
})

router.post('/deletePic', function (req, res) {

  var _id = req.body._id

  Image.deleteOne({_id: _id}, function (error, data) {
    var mess;
    if (error == null) {
      mess = 'Deleted Successfully !'
    } else {
      mess = error
    }
    res.render('delete', {title: 'Delete', message: mess, data: data})
  })
})

module.exports = router;
