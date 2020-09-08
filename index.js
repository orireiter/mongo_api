const mongodb = require("mongodb");
const oid = require("mongodb").ObjectID;
const mclient = mongodb.MongoClient;

var methods = {};

methods.create_db = (ip, db_name, collection_name) => {
    let db_url = `mongodb://${ip}:27017/`;
            
    mclient.connect(db_url, { useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;

        let dbo = db.db(db_name);
        dbo.createCollection(collection_name, (err, res) => {
            if (err) {
                console.log(err.name);
                console.log(err.codeName);
            }
            else {
                console.log(`db named "${db_name}" with collection named "${collection_name}" created`);    
            }
            db.close();
        });
    });
};


methods.insert_doc = (ip, db_name, collection_name, doc_dict) => {
    let db_url = `mongodb://${ip}:27017/`;
            
    mclient.connect(db_url, { useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;

        let dbo = db.db(db_name);
        
        dbo.collection(collection_name).insertOne(doc_dict, (err, res) => {
            if (err) {
                console.log(err.name);
                console.log(err.codeName);
            }
            else {
                console.log(`inserted doc to db named "${db_name}" with collection named "${collection_name}"`);    
            }
            db.close();
        });
    });
};


methods.delete_doc = (ip, db_name, collection_name, doc_dict) => {
    let db_url = `mongodb://${ip}:27017/`;
            
    mclient.connect(db_url, { useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;

        let dbo = db.db(db_name);
        let query = {_id: oid(doc_dict._id)}
        dbo.collection(collection_name).deleteOne(query, (err, res) => {
            if (err) {
                console.log(err.name);
                console.log(err.codeName);
            }
            else {
                console.log(`deleted doc to db named "${db_name}" with collection named "${collection_name}"`);    
            }
            db.close();
        });
    });
};


methods.show_collection = (ip, db_name, collection_name, query={}) => {
    let db_url = `mongodb://${ip}:27017/`;
            
    mclient.connect(db_url, { useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;

        let dbo = db.db(db_name);
        
        dbo.collection(collection_name).find(query).toArray((err, res) => {
            if (err) {
                console.log(err.name);
                console.log(err.codeName);
            }
            else {
                console.log(res);
                console.log(`queried db named "${db_name}" with collection named "${collection_name}"`);    
            }
            db.close();
            return res;
        });
    });
};





module.exports = methods;



/*
var test = insert_doc("localhost", "node", "users",{name: "ori", age: 21});


var test = delete_doc("localhost", "node", "b",{_id: oid("5f54f83a194575303425b659")});

var test = show_collection("localhost", "node", "b");

*/
