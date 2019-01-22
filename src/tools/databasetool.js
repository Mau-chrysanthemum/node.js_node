const MongoClient = require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectID
const url = "mongodb://localhost:27017";

const dbName = "szhmqd27";
// 暴露一个方法 ,插入一条数据
/**
 * @param {*} collectionName  集合名称
 * @param {*} data  数据
 * @param {*} callback   回调,把结果靠苏控制器  
 */
const insertSingle = (collectionName, data, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true },(err, client)=> { 
    //    拿到DB
        const db = client.db(dbName);
        // 拿到数据库中的集合
        const collection = db.collection(collectionName);
        
        collection.insertOne(data, (err, result) => {
            // 关闭数据库
            client.close();
            // 执行回调函数，传递结果给控制器
            callback(err, result)
        })

    })
}

// 暴露一个方法 ,查多条数据
/**
 * @param {*} collectionName  集合名称
 * @param {*} data  数据
 * @param {*} callback   回调,把结果靠苏控制器  
 */
const findYige = (collectionName, data, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true },  (err, client)=> { 
    //    拿到DB
        const db = client.db(dbName);
        // 拿到数据库中的集合
        const collection = db.collection(collectionName);

        collection.findOne(data, (err, doc) => {
            // 关闭数据库
            client.close();
            // 执行回调函数，传递结果给控制器
            callback(err, doc)
        })

    })
}
/**
 * @param {*} collectionName  集合名称
 * @param {*} data  数据
 * @param {*} callback   回调,把结果靠苏控制器  
 */
const findMany = (collectionName, data, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true },(err, client)=> { 
    //    拿到DB
        const db = client.db(dbName);
        // 拿到数据库中的集合
        const collection = db.collection(collectionName);

        collection.find(data).toArray((err, docs) => {
            // 关闭数据库
            client.close();
            // 执行回调函数，把结果传递调用它的控制器
            callback(err, docs)
        })

    })
}
const updateYige = (collectionName, contenction, data, callback) => {
    MongoClient.connect(
        url,
        { useNewUrlParser: true },
        (err, client) => {
        //    拿到DB
        const db = client.db(dbName);
        // 拿到数据库中的集合
        const collection = db.collection(collectionName);

            collection.updateOne(contenction,{$set:data} ,(err, docs) => {
            // 关闭数据库
            client.close();
            // 执行回调函数，把结果传递调用它的控制器
            callback(err, docs)
        })

    })
}

// 暴露一个方法 ,删除某条条数据
/**
 * @param {*} collectionName  集合名称
 * @param {*} data  数据
 * @param {*} callback   回调,把结果靠苏控制器  
 */
const deleteYige = (collectionName, data, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        //    拿到DB
        const db = client.db(dbName);
        // 拿到数据库中的集合
        const collection = db.collection(collectionName);

        collection.deleteOne(data, (err, doc) => {
            // 关闭数据库
            client.close();
            // 执行回调函数，传递结果给控制器
            callback(err, doc)
        })

    })
}


module.exports = {
    insertSingle,
    findYige,
    findMany,
    ObjectId,
    updateYige,
    deleteYige
}