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
    var id = `/system/${Math.floor(Math.random()*1500)}`;
    res.end(id);
    app.use(id, (req2, res2) => {
        proxy.web(req2, res2, { target: req.body.site });
    });
});

app.listen(8080, ()=>{
    console.log('l');
})