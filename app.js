const express = require("express");
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.json());

const mongo_stuff = require("./mongoStuff.js")

const config = require("config");



/*  GET method is problematic, probably need async stuff.

app.get("/register", (req, res, next) => {
    let body = req.body;
    let conf = config.get("mongo").users.dbConfig;
    
    const ori = mongo_stuff.show_collection(conf.host, conf.dbName, conf.collection, body);
    console.log(ori);
    res.send(ori);

   });
*/


const dbs = config.get("mongo");
for (const [key, value] of Object.entries(dbs)) {

    /*POST works by sending a json as such => {name: 'ori', age: '21'}
    can use any key\value*/
  app.post(`/${key}`, (req, res, next) => {
    let body = req.body;
    mongo_stuff.insert_doc(value.dbConfig.host, value.dbConfig.dbName, value.dbConfig.collection, body);
    res.send(`document registered to ${key} successfully`);
    });


    /*DELETE works by sending a json as such => { _id: '5f577c11c00a5b03ec47f501' }
    only works using id, not by other fields*/
  app.delete(`/${key}`, (req, res, next) => {
    let body = req.body;
    mongo_stuff.delete_doc(value.dbConfig.host, value.dbConfig.dbName, value.dbConfig.collection, body);
    res.send(`document deleted from ${key} successfully`);
    });  
};


app.listen(config.get("express").port, () => {
    console.log(`Server running on port ${config.get("express").port}`);
   });