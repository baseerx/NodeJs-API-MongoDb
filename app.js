const express=require('express')
const app=express()
const contactsRoutes=require('./routes/contacts')
const usersRoutes=require('./routes/users')
const dbConnect=require('./config/dbConfig')

dbConnect()
app.use(express.json()) // for parsing application/json


app.use('/api/contacts', contactsRoutes)
app.use('/api/users', usersRoutes)
const dotenv=require('dotenv').config()

const port= process.env.PORT || 5002



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

