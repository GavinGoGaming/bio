var express = require('express');
var proxys = require('http-proxy');
var app = express();
var proxy = proxys.createProxyServer({
    changeOrigin: true,
    secure: false,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    },
    xfwd: true,
});  

app.use(require('body-parser').json());
app.use(express.static(__dirname));

app.use('/proxy', (req, res) => {
    console.log(req.body);
    proxy.web(req, res, { target: req.body.site });
});

app.listen(3000, ()=>{
    console.log('l');
})