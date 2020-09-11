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


methods.insert_doc = async (ip, db_name, collection_name, doc_dict) => {
    let db_url = `mongodb://${ip}:27017/`;
    
    try{
        var client = await mclient.connect(db_url, { useUnifiedTopology: true });
    }
    catch{
        return("mongo connection error");
    }
    
    let dbo = client.db(db_name);
    
    try {
        const res = await dbo.collection(collection_name).insertOne(doc_dict);
        return res;
    }
    catch{
        return("mongo insert error");
    }
    finally {
        client.close();
    };
};


methods.delete_doc = async (ip, db_name, collection_name, doc_dict) => {
    let db_url = `mongodb://${ip}:27017/`;
            
    try{
        var client = await mclient.connect(db_url, { useUnifiedTopology: true });
    }
    catch{
        return("mongo connection error");
    }
    
    let dbo = client.db(db_name);
    
    try {
        let query = {_id: oid(doc_dict._id)};
        const res = await dbo.collection(collection_name).deleteOne(query);
        return res;
    }
    catch{
        return("mongo delete error");
    }
    finally {
        client.close();
    };
};



methods.update_doc = async (ip, db_name, collection_name, doc_id, doc_dict) => {
    let db_url = `mongodb://${ip}:27017/`;
            
    try{
        var client = await mclient.connect(db_url, { useUnifiedTopology: true });
    }
    catch{
        return("mongo connection error");
    }
    
    let dbo = client.db(db_name);
    
    try {
        let query = {_id: oid(doc_id._id)};
        const res = await dbo.collection(collection_name).updateOne(query, doc_dict);
        return res;
    }
    catch{
        return("mongo update error");
    }
    finally {
        client.close();
    };
};



methods.show_collection = async (ip, db_name, collection_name, query={}) => {
    let db_url = `mongodb://${ip}:27017/`;
            
    try{
        var client = await mclient.connect(db_url, { useUnifiedTopology: true });
    }
    catch{
        return("mongo connection error");
    }

    let dbo = client.db(db_name);

    try{
       const res  = await dbo.collection(collection_name).find(query).toArray();
       return(res);
    }
    catch{
        return("mongo query error");
    }
    finally {
        client.close();
    }
}
    
   



module.exports = methods;