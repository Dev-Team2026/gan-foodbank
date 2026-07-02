const express = require("express");
const server = express();
const port = 3000;
//require("dotenv").config(); //import dotenv
//const { SECRET_KEY } = process.env; 
const cors = require("cors"); //For disabling default browser security
const jwt = require("jsonwebtoken")

const db = require('better-sqlite3')('test.db')
db.pragma('journal_mode = WAL')

//Middleware
server.use(express.json()); //to ensure data is trasmitted as json
server.use(express.urlencoded({ extended: true })); //to ensure data is encoded and decoded while transmission
server.use(cors());

//get all from users table
const getUsers = () =>{
    const stmt = db.prepare('SELECT * FROM users')
    const users = stmt.all()
    console.log(users)
    return (users)
}

//store user list
const users = getUsers()
//const users = [{name: "maxwell", password:123, role: "staff"}]

const getRequests = () =>{
    const stmt = db.prepare('SELECT * FROM requests')
    const requests = stmt.all()
    return (requests)
}

let requests = getRequests()
let requestFilters = {itemFilter: "", amountFilter: "", amountFilterType: "", recipientFilter: "", activeFilters: false}
//let requests = [{item: "Soup", amount: 4, recipient: "Max", requestId: 0}, {item: "Carrot", amount: 12, recipient: "Max", requestId: 1}, {item: "Beans", amount: 23, recipient: "Max", requestId: 2}]

const addRequest = (requestId, item, amount, recipient) => {
    const stmt = db.prepare('INSERT INTO requests (requestId, item, amount, recipient) VALUES (@requestId, @item, @amount, @recipient)')
    stmt.run({requestId: requestId, item: item, amount: amount, recipient: recipient})
    console.log(getRequests())
    return (getRequests())
}
const deleteRequest = (requestId) => {
    const stmt = db.prepare('DELETE FROM requests WHERE requestId=@requestId')
    stmt.run({requestId: requestId})
    return (getRequests())
}

server.listen(port, () => {
      console.log(`Database is connected\nServer is listening on ${port}`);
      console.log(new Date(Date.now()));
    });

server.get("/", (request, response) => {
    console.log("main endpoint")
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
    try {
        if (requestFilters.activeFilters){
            const filteredRequests = []
            //if (requestFilters.itemFilter != ""){
            //    //
            //} else {
            //    if (requestFilters.amountFilter != "") {
            //        //
            //    } else {
            //        
            //    }
            //}
            requests.forEach((targetRequest) => {
                let filterPass = true
                if (requestFilters.itemFilter.toLowerCase() != targetRequest.item.toLowerCase() && requestFilters.itemFilter != "")
                {
                    filterPass = false
                }
                if (requestFilters.amountFilter != "")
                {
                    if (requestFilters.amountFilterType == "greater") {
                        console.log(targetRequest )
                        console.log( requestFilters)
                        //console.log(targetRequest.amount > requestFilters.amountFilter)
                        //console.log(12 > 6)
                        if (targetRequest.amount <= requestFilters.amountFilter){
                            filterPass = false
                        }
                    }
                    else if (requestFilters.amountFilterType == "lesser") {
                        console.log("test2")
                        if (targetRequest.amount >= requestFilters.amountFilter ){
                            filterPass = false
                        }
                    }
                    else {
                        console.log("test3")
                        if (targetRequest.amount != requestFilters.amountFilter){
                            filterPass = false
                        }
                    }
                }
                if (requestFilters.recipientFilter.toLowerCase() != targetRequest.recipient.toLowerCase() && requestFilters.recipientFilter != "")
                {
                    filterPass = false
                }
                if (filterPass){
                    filteredRequests.push(targetRequest)
                }
            })
            response.send(filteredRequests);
        } else {
            response.send(requests);
        }
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

server.post("/requests", (request, response) => {
    const {item,amount,recipient} = request.body
    try {
        requests = addRequest(requests[requests.length-1].requestId+1, item, parseInt(amount), recipient)
        return response.status(200).send({
            message: `Request added successfully!`
        });
    } catch(error){
        response.status(500).send({message: error.message})
    }
})

server.delete("/requests/:id", (request, response) => {
    const {id} = request.params;
    //const newRequestsList = []
    try {
        requests = deleteRequest(id)
        response.status(200).send({
            message: `Request completed!`
        });
    } catch(error){
        response.status(500).send({message: error.message})
    }
})

server.post("/filterRequests", (request, response) => {
    const {itemFilter, amountFilter, amountFilterType, recipientFilter} = request.body
    console.log(itemFilter, amountFilter, amountFilterType, recipientFilter)
    try {
        if (itemFilter === "" && amountFilter === "" && recipientFilter=== ""){
            console.log("test1")
            requestFilters.itemFilter = ""
            requestFilters.amountFilter = ""
            requestFilters.amountFilterType = ""
            requestFilters.recipientFilter = ""
            requestFilters.activeFilters = false
        } else{
            console.log("test2")
            requestFilters.itemFilter = itemFilter
            requestFilters.amountFilter = int(amountFilter)
            requestFilters.amountFilterType = amountFilterType
            requestFilters.recipientFilter = recipientFilter
            requestFilters.activeFilters = true
        }
        console.log(requestFilters)
        return response.status(200).send({
            message: `Filters added successfully!`
        });
        
    } catch(error){
        response.status(500).send({message: error.message})
    }
})
//endpoint for showing all users
server.get("/users", (request, response) => {
    response.send(getUsers())
});

