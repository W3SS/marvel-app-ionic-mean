module.exports = {
    //prod
  database: `${process.env.ENV_DEV_DATABASE_HOST }/${process.env.ENV_DATABASE_NAME}`,   
  secret: process.env.ENV_DATABASE_SECRET 
}
 