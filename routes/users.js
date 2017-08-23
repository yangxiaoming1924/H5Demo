var express = require('express');
var tongjiModel=require('../models/tongji');
var bodyParser = require('body-parser');
var path = require('path');
var multer = require('multer'),
    fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

var router = express.Router();
app.use(bodyParser.json());
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 文件初始路径
        let filePath = path.join(__dirname,'../', 'upload');
        if (!fs.existsSync(filePath)) {
            fs.mkdir(filePath, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    cb(null, filePath)
                }
            })
        } else {
            cb(null, filePath)
        }
    },
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        // // UUID 处理
        // function guid() {
        //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        //         var r = Math.random() * 16 | 0,
        //             v = c == 'x' ? r : (r & 0x3 | 0x8);
        //         return v.toString(16);
        //     });
        // }
        cb(null,req.body.tel+ ext)
    }
});
let upload = multer({ storage: storage });
// 表单的name
let uploadSingle = upload.single('file');
router.post('/toupiao',function (req,res) {

});
/* GET users listing. */
router.post('/tongji',function (req,res) {
    // 处理表单数据
    uploadSingle(req, res, (err) => {
        if (err) return;
        var file = req.file;
        function getTime() {
            let date = new Date();
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let d = date.getDate();
            return y + '-' + m + '-' + d;
        }
        let simpleData = {
            "username":req.body.username,
            "tel":req.body.tel,
            "addr":req.body.addr,
            "image_time": getTime(),
            "image_newUrl": '../upload/' + file.filename
        }
        //插入数据到数据库
            tongjiModel.insertData(simpleData,function (data) {
                console.log(`flag:${data}`);
            });
        // 处理单条数据
        simpleData = JSON.stringify(simpleData);
        // 使用appendFile追加数据做统计
        fs.appendFile('../data.json', simpleData, (err) => {
            if (err) {
                throw err
            }
        })
        res.send(simpleData)
    })
})
router.get('/', function(req, res) {
  res.send('respond with a resource');
});


module.exports = router;
