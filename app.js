const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 4000;



mongoose.connect(process.env.dataBase).then((res)=>{
  console.log('connected to database')
}).catch((error)=>{
    console.log(error)
    process.exit(1)
})


app.use('/hook',graphqlHTTP({
    schema,
    graphiql:true
}))







app.listen(port,()=>{
    console.log('we are live on 4000')
})
