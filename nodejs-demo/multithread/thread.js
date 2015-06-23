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
for (var i = 0;i < numCPUs;i++){
    (function(i){
        console.log('worker '+i+' is starting.');
        workers.push(cp.fork('../bin/start.js'));
    }(i+1));
}
//console.log(workers);
net.createServer(function(s){
        s.pause();
        var worker = workers.shift();
        worker.send('c',s);
        workers.push(worker);
    }
).listen(8080);