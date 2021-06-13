const express = require('express');
const app = express();
const fs = require('fs')

app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({extended: true}));
app.use(express.json())

console.log(JSON.parse(fs.readFileSync('./db.json')))
let data = []

app.post(`/api`, (req,res) => {
    console.log(req.body);
    fs.writeFileSync('./db.json', JSON.stringify(req.body))
    res.send(JSON.stringify('data succesfully written'))
})
app.get(`/api`, (req,res) => {
    res.json(JSON.parse(fs.readFileSync('./db.json')));
})
app.listen(3000, () => {
    console.log('Server listening on port 3000');
})