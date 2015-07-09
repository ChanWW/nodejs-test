#!/usr/bin/env node

/**
 * Module dependencies.
 * 依赖加载
 */

var app = require('../app');
//var debug = require('debug')('nodejs-demo:server');
var http = require('http');
/**
 * Create HTTP server.
 * 创建HTTP服务器实例
 */

var server = http.createServer(app);
console.log("Server started on "+process.pid);
process.on("message", function(msg,socket) {
    process.nextTick(function(){
        //console.log(msg);
        if(msg == 'check'){
            console.log('<cp>:'+process.pid+' checking');
            process.send('<mp>:'+process.pid+' checked');
        }
        //console.log("Responded on child_process:pid "+process.pid);
        if(msg == 'c' && socket) {
            //console.log(socket);
            //console.log(111);
            socket.readable = socket.writable = true;
            //socket.type = server.type;
            socket.server = server;
            socket.resume();
            //server.connections++;

            server.emit("connection", socket);
            socket.emit("connect");
        }
    });
});
