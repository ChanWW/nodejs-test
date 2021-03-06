/**
 * Created with IntelliJ IDEA.
 * User: cww
 * Date: 15-6-22
 * Time: 上午11:23
 * To change this template use File | Settings | File Templates.
 */
//var cluster = require('cluster');
var cp = require('child_process');
var numCPUs = require('os').cpus().length;
var net = require('net');

var workers = [];
console.log('<master> is started. pid:'+process.pid);
for (var i = 1;i < numCPUs;i++){
    (function(i){
        console.log('worker '+i+' is starting.');
        workers.push(cp.fork('../bin/start.js'));
    }(i));
}
//console.log(workers);
net.createServer(function(s){
        s.pause();
        s.setKeepAlive(false);
        var worker = workers.shift();
        worker.send('c',s);
        workers.push(worker);
    }
).listen(8080);
