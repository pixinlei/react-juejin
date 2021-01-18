const Koa = require('koa')
const koaStatic = require('koa-static')

const app = new Koa()

app.use(koaStatic('./githubdenglu.html'))

app.listen(4000, () => {
  console.log('服务在4000端口运行');
})
