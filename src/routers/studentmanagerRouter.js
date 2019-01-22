const express = require('express');
const path = require('path')
// 创建路由
const studentManagerRouter = express.Router();


// 导入控制器
const studentManagerController = require(path.join(__dirname, "../controllers/studentmanagerController.js"))

// 获取学生get的请求=>获取页面的请求
studentManagerRouter.get('/list', studentManagerController.getStudentListPage);
// 获取新增get的请求=>获取页面
studentManagerRouter.get('/add', studentManagerController.getStudentAddPage);
// 提交新增的请求
studentManagerRouter.post('/add', studentManagerController.StudentAddPage);
// 获取新增get的请求=>获取页面
studentManagerRouter.get('/edit/:studentId', studentManagerController.getStudentEditPage);

studentManagerRouter.post('/edit/:studentId', studentManagerController.StudentEditPage);

// 导出路由
module.exports =studentManagerRouter
