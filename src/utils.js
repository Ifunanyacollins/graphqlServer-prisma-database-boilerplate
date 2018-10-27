const jwt = require('jsonwebtoken')
const APP_SECRET = 'this_could_be_anything'

function getUserId(context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    console.log('from auth util',Authorization)
    const token = Authorization.replace('Bearer ', '')
    console.log('from utili',token)
    const { userId } = jwt.verify(token, APP_SECRET)
    console.log('from util and user id ', userId)
    return userId
  }

  throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  getUserId,
}