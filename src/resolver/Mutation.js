const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent,args,context,info) {
    
    const password = await bcrypt.hash(args.password,10)

    const user = await context.db.mutation.createUser({
    data:{...args,password}
    }, `{ id }`)

    const token = jwt.sign({userId:user.id},APP_SECRET)

    return{
        token,
        user
    }

}

async function login(parent,args,context,info){

    const  user = await context.db.query.user({
        where:{email:args.email}
    }, `{id password}`)
    if(!user){
        throw new Error('Invalid user')
    }
    
    const valid = bcrypt.compare(args.password,user.password)
    if(!valid){
        throw new Error('wrong password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return{
        token,
        user
    }

}


// Example mutation for post
function post(parent, args, context, info) {
    const userId = getUserId(context)
    return context.db.mutation.createLink(
      {
        data: {
          url: args.url,
          description: args.description,
          postedBy: { connect: { id: userId } },
        },
      },
      info,
    )
  }

// Example mutation to update post
function updatepost(root,{id,...rest},context,info){
            
    return  context.db.mutation.updateLink({
          data:{
          ...rest
          },
          where:{
            id
          }
      },info)
   
}

// Example mutation to delete post
function deletepost(root,{id},context,info){
           
    return context.db.mutation.deleteLink({
         where:{
             id
         }
     },info)

 }

module.exports = {
    login,
    signup,
    post,
    updatepost,
    deletepost
}