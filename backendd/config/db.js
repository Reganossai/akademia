const mongoose = require("mongoose");


const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(
      `mongodb+srv://reganossai:Holahmola!1@cluster0.lxepg1u.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log(connect.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {dbConnect}