const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()



mongoose.connect("mongodb://collins:collins123@ds121753.mlab.com:21753/busterminal").then((res)=>{
  console.log('connected to database')
}).catch((error)=>{
    console.log(error)
    process.exit(1)
})


app.use('/hook',graphqlHTTP({
    schema,
    graphiql:true
}))





app.listen(4000,()=>{
    console.log('we are live on 4000')
})
