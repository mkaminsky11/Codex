var express = require('express');
var app = express();

app.use('/css', express.static('css'))
app.use('/js', express.static('js'))
app.use('/img', express.static('img'))
app.use('/glow', express.static('glow'))
app.use('/general', express.static('general'))

app.get('/index.html', (req, res)=>{res.sendFile('index.html', { root: __dirname });});
app.get('/config.html', (req, res)=>{res.sendFile('config.html', { root: __dirname });});
app.get('/buffs.html', (req, res)=>{res.sendFile('buffs.html', { root: __dirname });});
app.listen(8080, function()
{
});