const router = require('koa-router')()
var crypto=require("crypto");
const UserService = require('../controllers/mySqlConfig')
router.prefix('/list')
const bcrypt = require('bcrypt');
let axios = require('axios')

// 获取列表的外部简单信息
router.get('/all', async (ctx, next) => {
  await UserService.getList().then(res => {
    ctx.body = res
  })
})

router.post('/addLike', async (ctx, next) => {
  await UserService.findName(ctx.request.body.names).then(async res => {
    ctx.body = res
  })
})

router.post('/addLike2', async (ctx, next) => {
  await UserService.gitlogin(ctx.request.body.data).then(res => {
    ctx.body = res
  })
})

router.post('/git', async (ctx, next) => {
  let tokenResponse = await UserService.gitlogin(ctx.request.body.code)
  let { access_token } = tokenResponse.data

  const result = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${access_token}`
    }
  });
  console.log(result.login);
  // let login = await result.login
  // let img = await result.avatar_url
  // console.log(login, '---------------------------------------------', img);
  // let { login: username, avatar_url: avatar} = result.data
  ctx.body = 1
  
})


module.exports = router