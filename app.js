const express = require("express");
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.json());

const mongo_stuff = require("./mongoStuff.js")

const config = require("config");




const dbs = config.get("mongo");
for (const [key, value] of Object.entries(dbs)) {

    /*POST works by sending a json as such => {name: 'ori', age: '21'}
    can use any key\value*/
  app.post(`/${key}`, async (req, res) => {
    let body = req.body;
    const answer = await mongo_stuff.insert_doc(value.dbConfig.host, value.dbConfig.dbName, value.dbConfig.collection, body)
      .then(answer => {
        try {
          
          if (answer.result.n == 1){
            res.send(`document inserted from ${key} successfully`);
          }
          else {
            res.send(`document inserted from ${key} UNsuccessfully`);
          }
        }
        catch{
          console.log(answer);
          res.send(answer)
        };
      })
      .catch( err => {
        res.send(err);
      })
  });


    /*DELETE works by sending going to url with the doc ID
      example http://localhos:3000/users/123456789123*/
  app.delete(`/${key}/:docID`, async (req, res) => {
    let body = {_id: req.params.docID}
    const answer = await mongo_stuff.delete_doc(value.dbConfig.host, value.dbConfig.dbName, value.dbConfig.collection, body)
      .then(answer => {
        try {
          
          if (answer.result.n == 1){
            res.send(`document deleted from ${key} successfully`);
          }
          else {
            res.send(`document deleted from ${key} UNsuccessfully`);
          }
        }
        catch{
          console.log(answer);
          res.send(answer)
        };
      })
      .catch(err => {
        console.log(err);
        res.send(err);
      })
  });


    /*PUT works by sending a json to url containing doc ID 
      example http://localhos:3000/users/123456789123*/
  app.put(`/${key}/:docID`, async (req, res) => {
    let docID= {_id: req.params.docID};
    let body = req.body;
    const answer = await mongo_stuff.update_doc(value.dbConfig.host, value.dbConfig.dbName, value.dbConfig.collection, docID, body)
      .then(answer => {
        try {
          
          if (answer.result.n == 1){
            res.send(`document updated from ${key} successfully`);
          }
          else {
            res.send(`document update from ${key} UNsuccessfully`);
          }
        }
        catch{
          console.log(answer);
          res.send(answer)
        };
      })
      .catch(err => {
        console.log(err);
        res.send(err);
      })
  });
    
    
    /*  GET method is used to query. by default retrieves all collection,
     otherwise requires mongo query */
  app.get(`/${key}`, async (req, res, next) => {
    let body = req.body;
    
    const answer = await mongo_stuff.show_collection(value.dbConfig.host, value.dbConfig.dbName, value.dbConfig.collection, body)
      .then(answer => {
        res.send(answer);
      })
      .catch(err => {
        console.log(err);
      })
  });
};


app.listen(config.get("express").port, config.get("express").IP, () => {
    console.log(`Server running on port ${config.get("express").port}`);
   });