/**
 * Created by Eric on 2017/7/24.
 */
var mongoose = require('./models');
var tongjiSchema  =  new mongoose.Schema({
    username:String,
    tel:String,
    addr:String,
    image_time:String,
    image_newUrl:String,

});
var tongjiModel   = mongoose.model('toupiaos',tongjiSchema);
exports.insertData=function (simpleData,callback) {
    tongjiModel.create(simpleData,function (err) {
      if(err)
          callback(false);
      else{
         callback(true);
      }
    });
};
