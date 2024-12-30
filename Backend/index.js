const express = require('express');
const http = require("http");
const cors = require("cors");
const path = require("path");
const {Server} = require("socket.io");
const connection = require('./connection');

const app = express();
app.use(cors());
const server = http.createServer(app);
app.use(express.static(path.resolve('./public')));

// connection();

//creating server for socket

// const io = new Server(server);
const io = new Server(server,{
    cors:{
      origin: '*',
      methods: ['GET','POST']
    }
  });

  let db; 
  
  connection().then(database => { 
    db = database; 
    // Ensure that the server starts only after the database connection is established 
    server.listen(3000, () => console.log(`Server started`));
 });



// server.listen(3000,()=> console.log(`Server started`));

//socket io request will be handle here

io.on("connection",(socket)=>{

    console.log("new user connected",socket.id);

    //when we get userMsg event from client then run this
    socket.on("userMsg",async(message)=>{

        console.log("New Message",message);

        try { 
            const newChat = {
             message: message,
            //  senderId: message.senderId, 
             // Adjust field name based on your message structure
              timestamp: new Date() 
            }; 
            const chatCollection = db.collection("chatCollection"); 
            await chatCollection.insertOne(newChat); 
            console.log("Message saved to database");
         } catch (error) { 
            console.error("Error saving message to database", error);
         }
    })
    
});





