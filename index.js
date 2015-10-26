var http = require('http')
var httpProxy = require('http-proxy')
var proxy = httpProxy.createProxyServer({})
var express = require('express')
var app = express()
/*
var config = {
    "fms.help": "http://127.0.0.1:80",
    "demo.fms.help": "http://127.0.0.1:3000",
}
*/

module.exports = function (config, request) {
    app.use('*', function (req, res) {
        if (request) {
            request(req,res)
        }
        var url = config[req.host]
        if (url) {
            res.send(req.host + "not in the configuration")
        }
        proxy.web(req, res, { target: url });
    })
    app.listen(80)
}