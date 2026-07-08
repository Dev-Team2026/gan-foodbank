import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import Database from 'better-sqlite3'
import bcrypt from 'bcrypt'
import * as db from './dbFunctions.js'

//Express
const server = express()
const port = 3000

//Middleware
server.use(express.json()) //to ensure data is trasmitted as json
server.use(express.urlencoded({ extended: true })) //to ensure data is encoded and decoded while transmission
server.use(cors())

//close db connection on shutdown
process.on('exit', () => {return db.close()})
//catches "interrupt signal" (ctrl + C)
process.on('SIGINT', () => {
    db.close()
    process.exit()
})

const indexDbResults = (dbTable) => {
    let i = 0
    dbTable.forEach((option)=>{
        option.index = i
        i++
    })
    console.log(dbTable)
    return(dbTable)
}

//store user list
let users = indexDbResults(db.getAllUsers())

//updates stored user list after db update
const refreshUserList= () => {
    users =  indexDbResults(db.getAllUsers())
}

//
// Endpoints
//
server.listen(port, () => {
      console.log(`Database is connected\nServer is listening on ${port}`)
      console.log(new Date(Date.now()))
    });

server.get("/", (request, response) => {
    console.log("main endpoint")
    response.send("Server is Live!")
});

server.post("/", async (request, response) => {
    const {name, password} = request.body
    try{
        //const user = await User.findOne({name});
        const user = users.find(user => user.name.toLowerCase() === name.toLowerCase());
        //console.log(user)
        if (!user){
            return response.status(404).send({message: "User does not exist"})
        }
        const match = await bcrypt.compare(password, user.password);
        //console.log(match)
        if (!match)
        {
            return response.status(403).send({message: "Incorrect credentials"})
        }
        const jwtToken = jwt.sign({role: user.role, name, }, "temp")
        return response.status(201).send({message: "User Authenticated", token: jwtToken})
    }catch(err){
        response.status(500).send({message: err.message})
    }
})

//endpoint for showing all users
server.get("/users", (request, response) => {
    response.send(db.getAllUsers())
})

server.post("/users", async (request, response) => {
    const {name, role, password} = request.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        users = db.addUser(name, "Lnameplaceholder", role, hashedPassword) //update place holder last name!
        refreshUserList()
        return response.status(200).send({
            message: `user added successfully!`
        });
    } catch(error){
        response.status(500).send({message: error.message})
    }
})

server.patch("/users", async (request, response) => {
    const {id, name, role, password} = request.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        users = db.updateUser(id, name, "Lnameplaceholder", role, hashedPassword) //update place holder last name!
        refreshUserList()
        return response.status(200).send({
            message: `user updated successfully!`
        });
    } catch(error){
        response.status(500).send({message: error.message})
    }
})

server.delete("/users/:id", (request, response) => {
  const { id } = request.params;
  try {
        users = db.deleteUser(id);
        refreshUserList()
        return response.status(200).send({
            message: `user deleted successfully!`
        });
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

