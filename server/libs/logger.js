const 
    fs = require('fs'),
    path = require('path'),
    util = require('util'),
    stackTrace = require('stack-trace'), 
    debugFileName = '../debug.log',
    logFile = fs.createWriteStream(path.join(__dirname, debugFileName), { flags: 'a','encoding':null,'mode':'0666' }),
    logStdout = process.stdout;


const getStackTrace = function () {
    var args, file, frame, line, method, objVal, dateNow , timeStr;
    args = arguments.length > 2 ? [].slice.call(arguments, 0) : [];
    frame = stackTrace.get()[2];
    file = path.basename(frame.getFileName());
    line = frame.getLineNumber();
    method = frame.getFunctionName(); 
    dateNow = new Date();
    timeStr  = [dateNow.getHours(), dateNow.getMinutes() ,dateNow.getSeconds() ,  dateNow.getMilliseconds()].join(":") + "ms";
    objVal = (arguments[0][1]) ?  " : object= " + JSON.stringify(arguments[0][1]) : "";
    args.unshift(timeStr + " :: [" + file + ":" + line +"] : " + arguments[0][0] + objVal);
    return args;
}

const writeLogFile = function () {
    logFile.write(util.format.apply(null, arguments) + '\n');
    logStdout.write(util.format.apply(null, arguments) + '\n');
}
 

console.log = writeLogFile;
console.error = writeLogFile;
console.info = writeLogFile;  

 

const info = function () {
    arguments[1] = "#INFO: " +  JSON.stringify(arguments[1]);
    console.info.apply(this,getStackTrace(arguments));
}

const log = function () {
    arguments[0] = "#LOG: " +  JSON.stringify(arguments[0]); 
    console.log.apply(this,getStackTrace(arguments));
}

const error = function () {
    arguments[0] = "#ERROR: " +  JSON.stringify(arguments[0]);
    var args = getStackTrace(arguments);
    console.error.apply(this,args);
  
}

const Logger = {
    log: log,
    error: error,
    info: info
}

module.exports = Logger;