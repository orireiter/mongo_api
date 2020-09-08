const express = require("express");
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.json());

const mongo_stuff = require("./index.js")

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

/*POST works by sending a json as such => {name: 'ori', age: '21'}
  can use any key\value*/
app.post("/register", (req, res, next) => {
    let body = req.body;
    
    let conf = config.get("mongo").users.dbConfig;
    
    mongo_stuff.insert_doc(conf.host, conf.dbName, conf.collection, body);
    res.send("user registered successfully");
    });


/*DELETE works by sending a json as such => { _id: '5f577c11c00a5b03ec47f501' }
  only works using id, not by other fields*/
app.delete("/register", (req, res, next) => {
    let body = req.body;

    let conf = config.get("mongo").users.dbConfig;
    
    mongo_stuff.delete_doc(conf.host, conf.dbName, conf.collection, body);
    res.send("user deleted successfully");
    });



app.listen(config.get("express").port, () => {
    console.log(`Server running on port ${config.get("express").port}`);
   });