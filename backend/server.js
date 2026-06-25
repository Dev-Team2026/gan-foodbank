const express = require("express");
const server = express();
const port = 3000;
//require("dotenv").config(); //import dotenv
//const { SECRET_KEY } = process.env; 
const cors = require("cors"); //For disabling default browser security
const jwt = require("jsonwebtoken")

//Middleware
server.use(express.json()); //to ensure data is trasmitted as json
server.use(express.urlencoded({ extended: true })); //to ensure data is encoded and decoded while transmission
server.use(cors());


const users = [{name: "maxwell", password:123, role: "staff"}]
let requests = []

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
        const jwtToken = jwt.sign({role: user.role, name, }, "temp");
        return response.status(201).send({message: "User Authenticated", token: jwtToken});
    }catch(error){
        response.status(500).send({message: error.message})
    }
});

server.get("/requests", (request, response) => {
    response.send(requests);
})

server.post("/requests", (request, response) => {
    const {item,amount,recipient} = request.body
    //console.log("test")
    try {
        requests.push({item: item, amount: amount, recipient: recipient, requestId: requests.length})
        return response.status(200).send({
            message: `Request added successfully!`
        });
    } catch(error){
        response.status(500).send({message: error.message})
    }
})

server.delete("/requests/:id", (request, response) => {
    const {id} = request.params;
    const newRequestsList = []
    try {
        for(let i = 0; i < requests.length; i++)
        {
            console.log(requests[i])
            if (requests[i].requestId != id)
            {
                newRequestsList.push(requests[i])
            }
        }
        requests = newRequestsList
        response.status(200).send({
            message: `Request completed!`
        });
    } catch(error){
        response.status(500).send({message: error.message})
    }
})