const express = require("express")
require("express-async-errors")
const router = require("./routes")
const AppError = require("./utils/AppError")
const uploadConfig = require("./config/upload")
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(router)

app.use((error, request, response, next)=>{
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      error: "error", 
      message: error.message
    })
  }
  console.error(error)

  return response.status(500).json({
    message: "error", 
    message: "Internal Server Error."
  })
})

PORT = 2222

app.listen(PORT, ()=> console.log(`Server is running on Port: ${PORT}`))



