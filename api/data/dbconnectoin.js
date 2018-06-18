//this file manages the connection with the MongoDB

var MongoClient = require("mongodb").MongoClient;
var dburl = "mongodb://localhost:9010";
var dbname = "meanHotels";
var _connection = null;

var open = function(){
    //for setting the connection and open the connection
    MongoClient.connect(dburl, function(err, client){
        if(err){
            console.log("DB connection failed !");
            return;
        }

        _connection = client.db(dbname);
        console.log("Db connection established");
    });
};

var get = function(){
    return _connection;
};

module.exports = {
    open : open,
    get : get
};