const express = require('express');
const mongoose = require('mongoose');
require('./config/config');
const app = express();

const XAPI = require('vtc-lrs');
let lrs = new XAPI.LRS();
someValidJSON = {
    actor: {
        objectType: "Agent",
        name: "Test Agent",
        mbox: "mailto:hello@example.com"
      },
      verb: {
        id: "http://example.com/verbs/tested",
        display: {
            "en-GB": "tested"
        }
      },
      object: {
        objectType: "Activity",
        id: "https://github.com/xapijs/xapi"
      },
    authority: {
        "objectType": "Agent",
        "account": {
            "homePage": "https://pruebadraco.lrs.io/keys/pruebadraco",
            "name": "pruebadraco"
        }
    },   
}

let xapi = new XAPI({
    lrs: lrs,
    getUser:function(req, username, password) {
        return new xapi.Account(username, //The name of the agent for the Authority
          true,  //this account has read access to the API
          true,   //this account has write access to the API
          false,   //this account can only retrieve data it posted 
          true,   //this account can use the advanced search apis
        ); 
      },
    connectionString: process.env.connectionString || "mongodb://localhost/MyLRS",
    baseUrl: process.env.host || "http://localhost:3000/xapi"
  });

app.use("/xapi", xapi);
app.use("/ui", xapi.simpleUI());

lrs.on("statementStored", function (id) {
    console.log("The ID of the stored statement is " + id);
    lrs.getStatement(id).then(statement => {
        console.log(statement);
    })
})

lrs.on("clientError", function (e) {
    console.log("The client sent an invalid xAPI request");
})
lrs.on('ready', function () {
    console.log("The lrs is attached to the database and ready. You can now use the programmatic API.")
    // lrs.insertStatement(someValidJSON).then( ()=>{
    //     console.log("The statement was stored");
    //   }).catch( (e)=>{
    //     console.log("There was some problem with the statement.", e)
    //   })
    })
//Port
app.listen(process.env.PORT, () => {
    console.log('Listener in port:', process.env.PORT);
});