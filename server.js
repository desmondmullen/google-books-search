const express = require("express");
const routes = require("./routes");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
  io.emit('chat message', 'test ' + Date.now());
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooksearch");

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}`);
});

// server.listen(3000, function () {
//   console.log(`🌎 ==> socket listening on port 3000`);
// });