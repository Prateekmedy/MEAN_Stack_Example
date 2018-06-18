var mongoose = require('mongoose');
var dburl = "mongodb://prateek:123Multimedia@ds161620.mlab.com:61620/meanhotels";

mongoose.connect(dburl);


// monitoring the status of mongoose connection
mongoose.connection.on('connected', function(){
    console.log('mongoose is connected to ' + dburl);
});

mongoose.connection.on('disconnected', function(){
    console.log('mongoose is disconnected');
});

mongoose.connection.on('error', function(err){
    console.log('mongoose is connected errror ' + err);
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected throught app termination (SIGINT)');
        process.exit(0);
    });
});


//this is for MAC OS & LINUX
// process.on('SIGTERM', function(){
//     mongoose.connection.close(function(){
//         console.log('Mongoose disconnected throught app termination (SIGTERM)');
//         process.exit(0);
//     });
// });


// process.once('SIGUSR2', function(){
//     mongoose.connection.close(function(){
//         console.log('Mongoose disconnected throught app termination (SIGUSR2)');
//         process.kill(process.pid, 'SIGUSR2');
//     });
// });


//Bring the model Schema from the hotel.model
require('./user.model');
require('./hotels.model');