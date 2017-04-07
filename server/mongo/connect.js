module.exports = function (host,database,secret) {
    const config = require('../configs/database'),
        mongoose = require('mongoose');
    
    console.log("connecting : " + host + " " + database);
    // Connect To Database
    mongoose.connect(config.database);
    
    // On Connection
    mongoose.connection.on('connected', () => {
        console.log('Connected to database ' + config.database);
    });

    // On Error
    mongoose.connection.on('error', (err) => {
        console.log('Database error: ' + err);
    });


}
