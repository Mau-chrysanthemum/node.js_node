/**
 * module.exports={
 * getRegisterpage:箭头函数
 * }
 */
const path = require('path')
const MongoClient = require('mongodb').MongoClient;
var captchapng = require('captchapng');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'szhmqd27';
//  导出一个方法,获取注册页面
exports.getRegisterpage = (req, res) => {
    res.sendFile(path.join(__dirname,"../public/html/register.html"))
}

// 导出注册的方法
exports.register = (req, res) => {
    const result = {
        status: 0,
        message:'注册成功'
    }
    const { username } = req.body
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName)
        const collection = db.collection('documents');
        collection.findOne({ username }, (err, doc) => {
            //如果result==null 没有查询到 就可以插入  如果查询到 说明用户已经存在
            if (doc) {
                result.status = 1
                result.message = "此用户已经存在"
                client.close();
                res.json(result)
            } else {
                // 如果用户名不存在就插入倒数局库
                // result2 有值就表示成功   result2  没有值表示失败     result2   是数据库返回的
                collection.insertOne(req.body, (err, result2) => {
                    if (!result2) {
                        result.status = 2
                        result.message="注册失败"
                    }
                    client.close();
                    res.json(result)
                })
                
            }
        })
    });
}
// 获取到导出方法,获取登陆页面
exports.getLoginpage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/login.html"))
}
exports.getVcodepage= (req, res) => {
    var p = new captchapng(80, 30, parseInt(Math.random() * 9000 + 1000)); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}
