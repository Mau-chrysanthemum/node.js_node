const path = require("path");
const template = require("art-template");
const moerQuer=require(path.join(__dirname,"../tools/databasetool.js"))

/**
 * 返回列表页面
 * @param {*} req
 * @param {*} res
 */
const getStudentListPage = (req, res) => {
    // Use connect method to connect to the server
    const keyword=req.query.keyword||''
    moerQuer.findMany('studentinfo', { name: { $regex: keyword } }, (err,docs)=> {

    // 渲染页面的代码
        const html = template(path.join(__dirname, "../public/html/list.html"), {
            students: docs, keyword,
            loginedName: req.session.loginedName
        });
    // console.log(html);

    res.send(html);
    

              
   })
};
// 获取新增页面
const getStudentAddPage = (req, res) => {
    const html = template(path.join(__dirname, "../public/html/add.html"), {
        loginedName: req.session.loginedName
    })
    res.send(html);
   
}

const StudentAddPage = (req, res) => {
    moerQuer.insertSingle('studentinfo', req.body, (err, result) => {
        if (!result) {
            res.send(`<script>alert("插入失败")</script>`)           
        } else {
            res.send(`<script>location.href='/studentmanager/list'</script>`) 
        }
    })
}

// 获取编辑页面
const getStudentEditPage = (req, res) => {
    console.log(req.params.studentId);
    const _id = moerQuer.ObjectId(req.params.studentId)
    moerQuer.findYige('studentinfo', _id, (err, doc) => { 
        doc.loginedName = req.session.loginedName
        const html = template(path.join(__dirname, "../public/html/edit.html"), doc)
        res.send(html);   
    })
}
// 编辑页面
const StudentEditPage = (req, res) => {
    const _id = moerQuer.ObjectId(req.params.studentId)
    moerQuer.updateYige('studentinfo', { _id } ,req.body, (err, result) => {
        if (!result) {
            res.send(`<script>alert("编辑失败")</script>`)
        } else {
            res.send(`<script>location.href='/studentmanager/list'</script>`)
        }
    })
}

// deleteStudentEditPage
// 删除某条数据
const deleteStudentEditPage = (req, res) => {
    const _id = moerQuer.ObjectId(req.params.studentId)
    moerQuer.deleteYige('studentinfo', { _id }, (err, result) => {
        if (!result) {
            res.send(`<script>alert("删除失败")</script>`)
        } else {
            res.send(`<script>location.href='/studentmanager/list'</script>`)
        }
    })
}
module.exports = {
    getStudentListPage,
    getStudentAddPage,
    StudentAddPage,
    getStudentEditPage,
    StudentEditPage,
    deleteStudentEditPage
};
