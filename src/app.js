//导包
const express = require('express')
const path = require('path')
// const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const session=require('express-session')

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat', resave: false,
    saveUninitialized: false, cookie: { maxAge: 60000 } }))
// //创建app
// const app = express()
// 设置静态资源根目录
app.use(express.static(path.join(__dirname, "public")))
app.all('/*', (req, res, next) => {
    // 如果是登录请求不拦截
    if (req.url.includes('account')) {
        next()
        // 其余页面拦截判断是否登录
    } else {
        if (req.session.loginedName) {
            next()
        } else {
            res.send(`<script>alert("还没有登录,请登录");location.href="/account/login"</script>`)
        }
    }
})

// 导入二级路径路由对象
const accountRouter = require(path.join(__dirname, "routers/accountRouter.js"))
//    一级路径判断   跳转到二级路径路由二级路径
app.use('/account', accountRouter)

const studentmanagerRouter = require(path.join(__dirname, "routers/studentmanagerRouter.js"))
//    一级路径判断   跳转到二级路径路由二级路径
app.use('/studentmanager', studentmanagerRouter)


//处理请求
app.get('/', (req, res) => {
    res.send('Hello World')
})


//启动
app.listen(3000, '127.0.0.1', err => {
    if (err) {
        console.log(err)
    }


    console.log("启动成功")
})