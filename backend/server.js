import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import Database from 'better-sqlite3'
import bcrypt from 'bcrypt'

//Express
const server = express()
const port = 3000

//Database
const db = new Database('invtest.db')
db.pragma('journal_mode = WAL')

//Middleware
server.use(express.json()) //to ensure data is trasmitted as json
server.use(express.urlencoded({ extended: true })) //to ensure data is encoded and decoded while transmission
server.use(cors())

const indexDbResults = (dbTable) => {
    let i = 0
    dbTable.forEach((option)=>{
        option.index = i
        i++
    })
    //console.log(dbTable)
    return(dbTable)
}
//get all users from db
const getUsers = () =>{
    const stmt = db.prepare('SELECT * FROM users')
    const users = stmt.all()
    return (indexDbResults(users))
}

const getInventory = () =>{
    const stmt = db.prepare('SELECT * FROM inventory')
    const inventory = stmt.all()
    return (indexDbResults(inventory))
}

//store user list
let users = getUsers()
let inventory = getInventory()


const addUser = (name, role, password) => {
    const stmt = db.prepare('INSERT INTO users (name, role, password) VALUES (@name, @role, @password)')
    stmt.run({name: name, role: role, password: password})
    console.log(getUsers())
    return (getUsers())
}

const editUser = (id, name, role, password) => {
    const stmt = db.prepare('UPDATE users SET name = @name, role = @role, password = @password WHERE id = @id')
    stmt.run({id: id, name: name, role: role, password: password})
    console.log(getUsers())
    return (getUsers())
}

const deleteUser = (id) => {
    const stmt = db.prepare('DELETE FROM users WHERE id = @id')
    stmt.run({id: id})
    console.log(getUsers())
    return (getUsers())
}

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
    response.send(getUsers())
})

server.post("/users", async (request, response) => {
    const {name, role, password} = request.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        users = addUser(name, role, hashedPassword)
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
        users = editUser(id, name, role, hashedPassword)
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
        users = deleteUser(id);
        return response.status(200).send({
            message: `user deleted successfully!`
        });
  } catch (error) {
    response.status(400).send({ message: error.message });
  }
});

server.get("/inventory", (request, response) => {
    response.send(getInventory())
})