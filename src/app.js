const {GraphQLServer} = require('graphql-yoga')
const { Prisma }  = require('prisma-binding')
const Query = require('./resolver/Query')
const Mutation = require('./resolver/Mutation')
const AuthPayload = require('./resolver/AuthPayload')


const resolvers = {
    Query,
    Mutation,
    AuthPayload
  }

const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false
      },
    context:req =>({
        ...req,
        db:new Prisma({
            typeDefs:'src/generated/prisma.graphql',
            endpoint:'https://eu1.prisma.sh/collins-ogbuzuru-35e2b7/database/dev',
            secret:'mysecret123',
            debug:true
           
        })
    })
})


server.start(()=>console.log('server started at port 400'))