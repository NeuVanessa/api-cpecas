
import mongoose from "mongoose";
const dotenv = require('dotenv')
dotenv.config()


mongoose
  .connect(
    `${process.env.DATABASE_URL}`
  )
  .then(() => {
    console.log("📦 Banco de dados conectado");
  });
