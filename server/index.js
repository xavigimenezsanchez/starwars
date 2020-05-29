const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const app = express();



const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(DIST_DIR));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models")
const User = db.user;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  User.create({
    username: 'test',
    email: 'test@test.com',
    password: '1234'
  })
});



app.get("/auth", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

//routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});
//
app.listen(port, function () {
 console.log('App listening on port: ' + port);
});