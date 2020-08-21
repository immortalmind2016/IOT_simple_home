const net = require("net");
const PORT = 9000;
let flame = 0;
let object = 0;
const mohamedId = "1805950982863551";
const mohamedIdg1 = "2596743037048026";
const accessToken =
  "EAAvlo6vZCFFIBADrhvaZAwKKx2u9JoeqEnZBBvM0fZCcPjeaKKus0ZC6PrXBA3UeN8AF3vBEFwwdtwUtRriecSElIBA0PAwLGaOy2dBG1ENVeacJkNKgIJizaPpZAAGNZBte8xt3r5hBIa36RHSS1eIu5bySFnoP4fz3aYcuQtyCILxs33ZABKifAJC2NlpjgEQZD";

const sendMessage = (message, accessToken, mohamedId) => {
  axios
    .post(
      `https://graph.facebook.com/v5.0/me/messages?access_token=${accessToken}`,
      {
        recipient: {
          id: mohamedId
        },
        message: {
          text: message
        }
      }
    )
    .then(() => {
      console.log("SENTTT");
    });
};
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

const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
client.connect(333, "192.168.43.101", function() {
  console.log("Connected");
});
app.get("/webhook", (req, res, err) => {
  console.log(req.query["hub.challenge"]);
  res.send(req.query["hub.challenge"]);
});
app.post("/webhook", (req, res, err) => {
  try {
    let message = req.body.entry[0].messaging[0].message.text;
    console.log(message);
    console.log(message.includes("open"));
    if (
      message.includes("افتح النور") ||
      message.includes("open lights") ||
      message.includes("open light") ||
      message.includes("turn on light") ||
      message.includes("turn on lights")
    ) {
      client.write("@3" + "\n");
      flame = 0;

      console.log("NOOOOOOOOOOOOOOOR OPEN");
      sendMessage("فتحته يا عم", accessToken, mohamedId);
    }
    if (
      message.includes("افتح الباب") ||
      message.includes("open door") ||
      message.includes("open door") ||
      message.includes("افتح باب") ||
      message.includes("افتح الجراش")
    ) {
      console.log("DOOR OPEN");
      object = 0;
      client.write("@5" + "\n");
      sendMessage("فتحته يا عم", accessToken, mohamedId);
    }
    if (
      message.includes("اقفل النور") ||
      message.includes("close lights") ||
      message.includes("close light") ||
      message.includes("turn off light") ||
      message.includes("turn off lights")
    ) {
      client.write("@4" + "\n");
      sendMessage("قفلته يا عم", accessToken, mohamedId);
    }
    if (
      message.includes("اقفل الباب") ||
      message.includes("close door") ||
      message.includes("close door") ||
      message.includes("اقفل باب") ||
      message.includes("اقفل الجراش")
    ) {
      client.write("@6" + "\n");
      sendMessage("قفلته يا عم", accessToken, mohamedId);
    }
  } catch (e) {}

  res.sendStatus(200);
});
app.get("/:id", (req, res, err) => {
  console.log("ID ", req.params.id);
  client.write("@" + req.params.id + "\n");

  res.send("OK");
});

client.setTimeout(2147483647);
client.on("data", function(data) {
  if (data.indexOf("1-1") > -1 && object == 0) {
    axios
      .post(
        `https://graph.facebook.com/v5.0/me/messages?access_token=${accessToken}`,
        {
          recipient: {
            id: mohamedId
          },
          message: {
            text: "فى حد دخل الجراش يابنى"
          }
        }
      )
      .then(() => {
        console.log("SENTTT");
      });
    object = 1;
    console.log("YES");
  } else if (data.indexOf("0-1") > -1 && flame == 0) {
    axios
      .post(
        `https://graph.facebook.com/v5.0/me/messages?access_token=${accessToken}`,
        {
          recipient: {
            id: mohamedId
          },
          message: {
            text: "صدقنى البيت بيولع "
          }
        }
      )
      .then(() => {
        console.log("SENTTT");
      });
    flame = 1;
  }
  console.log("Received: " + data);
});

client.on("close", function() {
  console.log("Connection closed");
});

app.listen(80);
