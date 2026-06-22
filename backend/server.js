const express = require("express");
const server = express();
const port = 3000;
require("dotenv").config(); //import dotenv
const { SECRET_KEY } = process.env; 
const cors = require("cors"); //For disabling default browser security
const jwt = require("jsonwebtoken")

//Middleware
server.use(express.json()); //to ensure data is trasmitted as json
server.use(express.urlencoded({ extended: true })); //to ensure data is encoded and decoded while transmission
server.use(cors());


const users = [{name: "maxwell", password:123, role: "staff"}]

server.listen(port, () => {
      console.log(`Database is connected\nServer is listening on ${port}`);
      console.log(new Date(Date.now()));
    });

server.get("/", (request, response) => {
    response.send("Server is Live!");
});

server.post("/", (request, response) => {
    const {name, password} = request.body;
    try{
        //const user = await User.findOne({name});
        const user = users.find(user => user.name === name);
        if (!user){
            return response.status(404).send({message: "User does not exist"})
        }
        //const match = await bcrypt.compare(password, user.password);
        const match = user.password == password
        if (!match)
        {
            return response.status(403).send({message: "Incorrect credentials"})
        }
        const jwtToken = jwt.sign({role: user.role, name, }, SECRET_KEY);
        return response.status(201).send({message: "User Authenticated", token: jwtToken});
    }catch(err){
        response.status(500).send({message: err.message})
    }
});