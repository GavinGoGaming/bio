var express = require('express');
var proxys = require('http-proxy');
var app = express();
var proxy = proxys.createProxyServer({
    changeOrigin: true,
    ssl: false
})

app.use('/', (req, res) => {
    proxy.web(req, res, { target: 'https://win11.blueedge.me' });
})

app.listen(3000, ()=>{
    console.log('l');
})