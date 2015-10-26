var http = require('http')
var httpProxy = require('http-proxy')
var proxyapp = httpProxy.createProxyServer({})
var express = require('express')
var app = express()
/*
var config = {
    "fms.help": "http://127.0.0.1:80",
    "demo.fms.help": "http://127.0.0.1:3000",
}
*/
var proxy = function (config, request) {
    app.use(function (req, res) {
        if (request) {
            request(req,res)
        }
        var url = config[req.hostname]
        if (!url) {
            res.send(req.hostname + " not in the configuration")
        }
        else {
            proxyapp.web(req, res, { target: url });
        }
    })
    app.listen(80)
}
module.exports = proxy