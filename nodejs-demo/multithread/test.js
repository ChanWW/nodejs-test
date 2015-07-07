/**
 * Created with IntelliJ IDEA.
 * User: cww
 * Date: 15-7-1
 * Time: 下午3:20
 * To change this template use File | Settings | File Templates.
 */
var cp = require('child_process');
var numCPUs = require('os').cpus().length;
var net = require('net');

var workers = [];
for (var i = 1;i < numCPUs;i++){
    (function(i){
        console.log('worker '+i+' is starting.');
        var worker = cp.fork('../bin/start.js');
        worker.on("message", function(msg){
            if(msg == 'checked')
            {
                console.log('cp is fine!');
            }
        });
        workers.push(worker);
    }(i));
}
//console.log(workers);
net.createServer(function(s){
        s.pause();
        var worker = workers.shift();
        worker.send('check');
        worker.send('c',s);
        workers.push(worker);
    }
).listen(8080);




