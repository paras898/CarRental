const mongoose= require("mongoose")

function connectDB(){
    mongoose.connect('mongodb+srv://prs89826:admin@cluster0.jmfisyk.mongodb.net/CarRental-user',{useUnifiedTopology:true, useNewUrlParser:true})
    const connection= mongoose.connection

    connection.on("connected", ()=>{
        console.log("Mongo DB Succesfull")
    })
    
    connection.on("error", ()=>{
        console.log("Mongo DB error")
    })
}
connectDB()
module.exports= mongoose