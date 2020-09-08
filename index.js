const mongodb = require("mongodb");
const oid = require("mongodb").ObjectID;
const mclient = mongodb.MongoClient;



const create_db = (ip, db_name, collection_name) => {
    let db_url = `mongodb://${ip}:27017/`;
            
    mclient.connect(db_url, (err, db) => {
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



const insert_doc = (ip, db_name, collection_name, doc_dict) => {
    let db_url = `mongodb://${ip}:27017/`;
            
    mclient.connect(db_url, (err, db) => {
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

const delete_doc = (ip, db_name, collection_name, doc_dict) => {
    let db_url = `mongodb://${ip}:27017/`;
            
    mclient.connect(db_url, (err, db) => {
        if (err) throw err;

        let dbo = db.db(db_name);
        
        dbo.collection(collection_name).deleteOne(doc_dict, (err, res) => {
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


const show_collection = (ip, db_name, collection_name) => {
    let db_url = `mongodb://${ip}:27017/`;
            
    mclient.connect(db_url, (err, db) => {
        if (err) throw err;

        let dbo = db.db(db_name);
        
        dbo.collection(collection_name).find({}).toArray((err, res) => {
            if (err) {
                console.log(err.name);
                console.log(err.codeName);
            }
            else {
                console.log(res);
                console.log(`queried db named "${db_name}" with collection named "${collection_name}"`);    
            }
            db.close();
        });
    });
};



/*
var test = insert_doc("localhost", "node", "b",{name: "ori", age: 21});


var test = delete_doc("localhost", "node", "b",{_id: oid("5f54f83a194575303425b659")});

var test = show_collection("localhost", "node", "b");

*/
