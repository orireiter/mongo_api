Made by Ori Reiter

This is a simple api to insert, delete, or query documents from mongo db.
As of now it supports standalone none access control enforced connection.
For example a local db with no password will work.


the config file is ./default.json

you can change there the API's IP and port.
and the names of the DB's and collections you will use.


each key you will put under "mongo" will create another url with the same name,
and will query the db and collection you gave it.

"mongo":{

        "users": {
            "dbConfig": {
                "host": "localhost",
                "dbName": "node",
                "collection": "users"
            }

the example above will create a url => http://localhost:3000/users
from which you can insert\delete\query the users collection of the node DB.
