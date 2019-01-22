 /**
  * 注册和登录的处理              ________本页面是路由的意思
  */
const express = require('express');
const path=require('path')
// 创建路由
const accountRouter = express.Router();
// 导入控制器模板  
const accountController=require(path.join(__dirname,"../controllers/accountConteroller.js"))
// 获取注册页面get的请求=>获取页面的请求
accountRouter.get('/register', accountController.getRegisterpage)
// 获取注册页面post的请求=>注册
accountRouter.post('/register', accountController.register)
// 获取登陆页面
accountRouter.get('/login', accountController.getLoginpage)
// 获取验证码
accountRouter.get('/vcode', accountController.getVcodeImage)
// 登陆页面  登陆
accountRouter.post('/login', accountController.login)
// 登出页面的氢气
accountRouter.get('/logout', accountController.logout)
// 导出路由
module.exports=accountRouter



