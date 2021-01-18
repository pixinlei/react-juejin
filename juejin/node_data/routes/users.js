const router = require('koa-router')()
var crypto=require("crypto");
const UserService = require('../controllers/mySqlConfig')
router.prefix('/users')
const bcrypt = require('bcrypt');

// 
function cryptPwd(password,salt) {    // 密码“加盐”
  var saltPassword=password+':'+salt;
  console.log('原始密码:%s',password);

  console.log('加盐后的密码:%s',saltPassword);

// 密码“加盐”的md5

  var md5=crypto.createHash("md5");

  var result=md5.update(saltPassword).digest("hex");

  console.log('加盐密码的md5值：%s', result);

  return result
}

//将从前端接受到的password进行加密
const _doCrypto = (password) => {
  return new Promise((resolve) => {
　　//这里的salt值，每次都是不一样的，也是根据取到不同的salt，所以每次的加密结果都不一样
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        resolve(hash)
      });
    });
  })
}

//通过_comparePwd方法将用户输入的明文与数据的加密过的进行比对
const _comparePwd = (fromUser, fromDatabase) => {
  return new Promise((resolve) => {
    bcrypt.compare(fromUser, fromDatabase, (err, res) => {
      resolve(res)
    })
  })
}

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/all', async (ctx, next) => {
  await UserService.getAccount().then(res => {
    ctx.body = res
  })
})

// 注册
router.post('/userRegister', async (ctx, next) => {
  let _username = ctx.request.body.username
  let _userpwd = ctx.request.body.userpwd
  if (!_username || !_userpwd) {
    ctx.body = {
      code: '80001',
      mess: '用户名或者密码不能为空',
    }
    return
  }
  let user = {
    username: _username,
    password: await _doCrypto(_userpwd)
  }
  await UserService.findUser(user.username).then(async (res) => {
    if (res.length) {
      try {
        throw Error('用户名已存在')
      } catch (e) {
        console.log(e)
      }
      ctx.body = {
        code: '80003',
        data: 'err',
        mess: '用户名已存在'
      }
    } else {
      await UserService.insertUser([user.username, user.password])
        .then(res => {
          let r = ''
          if (res.affectedRows !== 0) {
            r = 'ok'
            ctx.body = {
              code: '80000',
              data: r,
              mess: '注册成功',
            }
          } else {
            r = 'error'
            ctx.body = {
              code: '80004',
              data: r,
              mess: '注册失败'
            }
          }
        })
        .catch(err => {
          ctx.body = {
            code: '80002',
            data: err
          }
        })
    }
  })
    .catch(err => {
      ctx.body = {
        code: '80002',
        data: err
      }
    })
})

// 登陆
router.post('/userLogin', async (ctx, next) => {
  let _username = ctx.request.body.username
  let _userpwd = ctx.request.body.userpwd
  if (!_username || !_userpwd) {
    ctx.body = {
      code: '80001',
      mess: '用户名或者密码不能为空',
    }
    return
  }
  let user = {
    username: _username,
    password: _userpwd  
  }
  let isCorrect = null
  await UserService.findUser(user.username).then(async (res) => {
    console.log("密码：" + res[0].password);
    if (res.length) {
      isCorrect = await _comparePwd(user.password, res[0].password)
      if(isCorrect) {
        user.password = res[0].password
      }
    }
  })
  await UserService.userLogin(user.username, user.password).then(async (res) => {
    if(res.length) {
      ctx.body = {
        code: '80000',
        data: 'ok',
        mess: '登录成功'
      }
    } else {
      ctx.body = {
        code: '80003',
        data: 'err',
        mess: '用户名或密码错误'
      }
    }
  })
})



module.exports = router
