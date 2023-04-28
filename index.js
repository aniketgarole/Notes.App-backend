const express = require("express")
const { connection } = require("./connect")
const { userRouter } = require("./routes/User.routes")
const { notesRouter } = require("./routes/Notes.routes")
const { auth } = require("./middlewares/auth.middleware")
require("dotenv").config()
const app = express()
app.use(express.json())

app.use("/users", userRouter)

app.use(auth)
app.use("/notes", notesRouter)






app.listen(process.env.PORT, async()=> {
    console.log(`Server is running at port ${process.env.PORT}`)

    try {
        await connection
        console.log("Server is conncted to DB")
    } catch (error) {
        console.log("Could not connect to the DB")
        console.log(error)
    }
})