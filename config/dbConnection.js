const mongoose = require("mongoose")

const connectDB = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to database ${connect.connection.name}`);
        // console.log(connect.connection.name);
        // const userData = await mongoose.connection.db.collection("users").find().toArray();
        // console.log(userData);

    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;