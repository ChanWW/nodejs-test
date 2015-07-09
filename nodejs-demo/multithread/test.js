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
console.log('<master>starting now on '+process.pid);
var workers = [];

function start(){
    for (var i = 1;i < numCPUs;i++){
        (function(i){
            console.log('worker '+i+' is starting.');
            var worker = newThread();
            workers.push(worker);
        }(i));
    }

//console.log(workers);
net.createServer(function(s){
        s.pause();
        var worker = workers.shift();
        try{
            worker.send('check');
            worker.send('c',s);
        }
        catch(e){
            console.log(e.message);
            worker = newThread();
            worker.send('check');
            worker.send('c',s);
        }
        workers.push(worker);
    }
).listen(8080);


function newThread(){
    //var thread = cp.fork('../bin/start.js');    //npm test会找到multithread/bin/start.js去，路径错误。但直接node运行无误。
    var thread = cp.fork('C://Users/cww/Desktop/nodejs-test/nodejs-demo/bin/start.js');     //兼容npm test命令，采用绝对路径。
    thread.on("message", function(msg){
        if(msg)
        {
            console.log(msg);
        }
        else{
            thread.kill(SIGHUP);
            thread = newThread();
        }
    });
    return thread;
};
}
module.exports = start;

if(require.main === module){
    start();
}
/*
process.on('uncaughtException',function(e){
    process.stdout.write(e);
});
*/

