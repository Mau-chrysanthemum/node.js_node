/**
 * module.exports={
 * getRegisterpage:箭头函数
 * }
 */
const path = require('path')
const captchapng = require('captchapng');
const moerQuer = require(path.join(__dirname, "../tools/databasetool.js"))
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
    moerQuer.findYige("documents", { username }, (err, doc) => {
        if (doc) {
            result.status = 1
            result.message = "此用户已经存在"
           
            res.json(result)
        } else {
            // 如果用户名不存在就插入倒数局库
            // result2 有值就表示成功   result2  没有值表示失败     result2   是数据库返回的
            moerQuer.insertSingle("documents", req.body,(err, result2) => {
                if (!result2) {
                    result.status = 2
                    result.message = "注册失败"
                }
               
                res.json(result)
            })

        }
    })
}
// 获取到导出方法,获取登陆页面
exports.getLoginpage = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/login.html"))
}
// 验证码
exports.getVcodeImage = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000);
    console.log(vcode);
    req.session.vcode = vcode
    var p = new captchapng(80, 30,vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}
// 导处登陆方法

exports.login = (req, res) => {
    // const searsession = req.session.vcode
    const { username, password,vcode} = req.body
    const result = {
        status: 0,
        message: '登陆成功'
    }
    if (vcode != req.session.vcode) {
        result.status = 1
        result.message = '验证码错误'

        res.json(result)
        return
    }
    // MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    //     const db = client.db(dbName)
    //     const collection = db.collection('documents');
    moerQuer.findYige("documents", { username, password }, (err, roc) => {
        if (roc) {
          
            res.json(result)
        } else {
            result.status = 2,
            result.message = "账号或密码错误"
           
            res.json(result)
        }
     })
    // MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    //     const db = client.db(dbName)
    //     const collection = db.collection('documents');

    //     collection.findOne({ username, password }, (err, roc) => {
    //         console.log(roc);
    //         if (roc) {
    //             client.close();
    //             res.json(result)
    //         } else {
    //             result.status = 2,
    //                 result.message = "账号或密码错误"
    //             client.close();
    //             res.json(result)
    //         }
    //     })
    // });
}
