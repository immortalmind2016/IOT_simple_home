
const net = require('net');
const PORT = 9000;
/*
const server = net.createServer((socket) => {
  console.log('client connected');
  socket.on('end', () => {
    console.log('client disconnected');
  });
  socket.on("data",(data)=>{
      console.log(data.toString("utf8"))
      console.log(socket.remotePort)
      console.log(socket.remoteAddress)
      socket.write("test");
    })

//   socket.pipe(c);
});

server.on('error', (err) => {
  throw err;
});

server.listen(PORT, () => {
  console.log(`Server Up and runing in ${PORT}`);
});



// Prints: server listening 0.0.0.0:41234

*/
var client = new net.Socket();

const express=require("express")
const app=express();
const axios =require("axios");
const bodyParser=require("body-parser");
app.use(bodyParser.json())
client.connect(333, '192.168.1.6', function() {
	console.log('Connected');
 
  
   
 
     


});
app.get("/:id",(req,res,err)=>{
  client.write('@'+req.params.id);
  res.send("OK")
})


client.on('data', function(data) {
	console.log('Received: ' + data);
});

client.on('close', function() {
	console.log('Connection closed');
});

app.listen(80)