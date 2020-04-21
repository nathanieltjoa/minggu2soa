const express = require('express');
const app = express();
app.use(express.json());

const orang = [
    {id:1,nama:'nama1'},
    {id:2,nama:'nama2'},
];

app.get('/',(req,res)=>{
    res.send("Hello Wolrd");
});

app.get('/api/orang',(req,res)=>{
    res.send(orang);
    //res.send(req.query);
});

app.get('/api/orang/:id',(req,res)=>{
    const cariorang = orang.find(c=>c.id === parseInt(req.params.id));
    if(!cariorang) res.status(404).send("ID tidak ditemukan");
    else res.send(cariorang);
});

app.post('/api/orang',(req,res)=>{
    const orangbaru = {
        id: orang.length+1,
        nama: req.body.nama
    };
    orang.push(orangbaru);
    res.send(orangbaru);
});

app.put('/api/orang/:id',(req,res)=>{
    const cariorang = orang.find(c=>c.id === parseInt(req.params.id));
    if(!cariorang) res.status(404).send("ID tidak ditemukan");
    cariorang.nama = req.body.nama;
    res.send(cariorang);
});

app.delete('/api/orang/:id',(req,res)=>{
    const cariorang = orang.find(c=>c.id === parseInt(req.params.id));
    if(!cariorang) res.status(404).send("ID tidak ditemukan");
    const index = orang.indexOf(cariorang);
    orang.splice(index,1);
    res.send(orang);
});

const port = process.env.port || 3000;

app.listen(port,()=>console.log("Jalan "+port));