const bodyparser = require('body-parser');
const express = require('express');
const xapi = require('vtc-lrs');
const cors = require('cors');
require('./config/config');
const app = express();

//middleware xapi
let options = {
  lrs: new xapi.LRS(),  
  connectionString:"mongodb://localhost",
  getUser:function(req, username, password) {
    return new xapi.Account(username,true,true);
  },
  baseUrl: "http://localhost:4000/xapi"
};
app.use("/xapi", new xapi(options) );


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());


//Port
app.listen(process.env.PORT, () => {
    console.log('Listener in port:', process.env.PORT);
});