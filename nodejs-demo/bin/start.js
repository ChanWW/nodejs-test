#!/usr/bin/env node

/**
 * Module dependencies.
 * 依赖加载
 */

var app = require('../app');
var debug = require('debug')('nodejs-demo:server');
var http = require('http');
var cp = require('child_process');
/**
 * Create HTTP server.
 * 创建HTTP服务器实例
 */

var server = http.createServer(app);
console.log("Server started on "+process.pid);
process.on("message", function(msg,socket) {
    process.nextTick(function(){
        if(msg == 'c' && socket) {
            //console.log(socket);
            socket.readable = socket.writable = true;
            socket.resume();
            //server.connections++;
            socket.server = server;
            server.emit("connection", socket);
            socket.emit("connect");

        }
    });
    //console.log("Responded on child_process:pid "+process.pid);
});
