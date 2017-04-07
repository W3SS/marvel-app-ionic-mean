module.exports = {
  //database: 'mongodb://brad:brad@ds121190.mlab.com:21190/meanauthapp',   //prod
  database: `${process.env.ENV_DATABASE_HOST}/${process.env.ENV_DATABASE_NAME}`,    //dev
  secret: process.env.ENV_DATABASE_SECRET
}
