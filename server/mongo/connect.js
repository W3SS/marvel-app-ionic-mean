module.exports = function ( ) {
    const config = require('../configs/database'),
        mongoose = require('mongoose'),
        debug = require('debug')('marvel:'+ require('path').basename(__filename));
    
    debug("connecting : " + config.database + " " + config.secret);
    // Connect To Database
    mongoose.connect(config.database);    
    // On Connection
    mongoose.connection.on('connected', () => {
        debug('Connected to database ' + config.database);
    });

    // On Error
    mongoose.connection.on('error', (err) => {
        debug('Database error: ' + err);
    });


}
