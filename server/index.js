// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
import router from './controller';
import config from './config';

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
// 导入controller middleware:
const rest = require('./helper/rest')
const serve = require('koa-static');
const cors = require('koa-cors')
const koajwt = require('koa-jwt')
const path = require('path')


const app = new Koa()

// 解决跨域问题
app.use(cors())
app.use(serve(config.fileDir))
app.use(serve(__dirname + '/dist'));
app.use(koajwt({secret: 'jwt-secret', debug: true}).unless({
  path: ['/api/user/register', '/api/user/login', '/swagger-html', '/swagger-json']
}))
app.use(bodyParser())
app.use(rest.restify())
app.use(router.routes())
app.use(router.allowedMethods())

export default app.listen(config.port, () => {
  console.log(`App is listening on ${config.port}.`);
});