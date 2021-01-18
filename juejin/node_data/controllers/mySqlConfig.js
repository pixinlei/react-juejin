let mysql = require('mysql')
let config = require('./defaultConfig')
const axios = require('axios')

// 连接线程池
let pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT
})

// 统一连接数据库的方法
let allServices = {
    query: function (sql, values) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release() // 释放连接
                    })
                }
            })
        })
    }
}

// 读取account表的内容
let getAccount = function () {
    let _sql = `select * from account;`
    return allServices.query(_sql)
}

// 用户登录
let userLogin = function (username, password) {
    let _sql = `select * from account where username="${username}" and password="${password}" ;`
    return allServices.query(_sql)
}

// 查找用户
let findUser = function (username) {
    let _sql = `select * from account where username="${username}"`
    return allServices.query(_sql)
}

// 用户注册
let insertUser = function (value) {
    let _sql = `insert into account set username=?,password=?;`
    return allServices.query(_sql, value)
}

// 获取列表的简单信息
let getList = function () {
    let _sql = `select * from list;`
    return allServices.query(_sql)
}

// 查找对应名字的那条数据
let findName = function (v) {
    let _sql = `select * from list where names='${v}';`
    return allServices.query(_sql)
}

// 点赞数加一
let addLike = function (v) {
    console.log('v:' + v);
    let likes = Number(v[0].likes) + 1
    let names = v[0].names
    let _sql = `UPDATE LIST SET likes=${likes} WHERE NAMES='${names}'`
    return allServices.query(_sql)
}

let githubCode = ''
let gitlogin = async function (v) {
    githubCode = v
    let clientID = 'f14ea1d104eaa5638be8'
    let clientSecret = `aeac8cbdfba078ceff7b0a3b4816cdf06740f7d3`
    const tokenResponse = await axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token?' +
          `client_id=${clientID}&` +
          `client_secret=${clientSecret}&` +
          `code=${githubCode}`,
        headers: {
          accept: 'application/json'
        }
      });
      return tokenResponse
    // let access_token = querystring.parse(res.data).access_token
    // let userInfo = axios.get(`https:api.github.com/user?access_token=${access_token}`)
    // console.log(userInfo);
    // return userInfo
}





// console.log('tokenResponse:' + tokenResponse)


// 导出方法
module.exports = {
    getAccount,
    userLogin,
    findUser,
    insertUser,
    getList,
    findName,
    addLike,
    gitlogin
}