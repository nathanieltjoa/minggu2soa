const express = require('express');
const app = express();
app.use(express.json());

const user = [
    {nomorhp:"082190302881",password:"asd",nama:"asd",email:"asd.yahoo",saldo:"1000"},
    {nomorhp:"082190302882",password:"asd1",nama:"asd1",email:"asd1.yahoo",saldo:"1000"},
];
const history= [
    {nomorhp:"21321321",saldo:"1000",keterangan:"asdwasd"}
];
const kontak= [

];
const login = "";

app.get('/api',(req,res)=>{
    res.status(200).send();
});

app.post('/api/addUser',(req,res)=>{
    const userBaru = {
        nomorhp: req.body.nomorhp,
        password: req.body.password,
        nama: req.body.nama,
        email: req.body.email,
        saldo: req.body.saldo
    };
    user.push(userBaru);
    res.status(200).send(userBaru);
});

app.post('/api/checkLogin',(req,res)=>{
    var nohp = req.body.nomorhp;
    var password = req.body.password;
    const cariorang = user.find(c=>c.nomorhp === nohp);
    if(!cariorang){ res.status(400).send("nomor hp tidak ada");}
    else {
        if(cariorang.password == password){
            res.status(200).send(cariorang);
        }else{
            res.status(400).send("password tidak sesuai");
        }
    }
});

app.put('/api/changePassword',(req,res)=>{
    var nohp = req.body.nomorhp;
    var oldpassword = req.body.oldpassword;
    var newpassword = req.body.newpassword;
    const cariorang = user.find(c=>c.nomorhp === nohp);
    if(!cariorang){ res.status(400).send("nomor hp tidak ada");}
    else{
        if(cariorang.password == oldpassword){
            cariorang.password = newpassword;
            res.status(200).send(cariorang);
        }else{
            res.status(400).send("password tidak sesuai");
        }
    }
});

app.put('/api/addSaldo',(req,res)=>{
    var nohp = req.body.nomorhp;
    var saldo = parseInt(req.body.saldo);
    const cariorang = user.find(c=>c.nomorhp === nohp);
    if(!cariorang){ res.status(400).send("nomor hp tidak ada");}
    else{
        var saldo1 = parseInt(cariorang.saldo);
        var saldo2 = saldo1 + saldo;
        cariorang.saldo = saldo2+"";
        historySaldo = {
            nomorhp: nohp,
            saldo: saldo,
            keterangan: "TOPUP"
        };
        history.push(historySaldo);
        res.status(200).send(cariorang);
    }
});

app.get('/api/saldo',(req,res)=>{
    var nohp = req.body.nomorhp;
    const cariorang = user.find(c=>c.nomorhp === nohp);
    if(!cariorang){ res.status(400).send("nomor hp tidak ada");}
    else{
        var cariHistory = history.find(c=>c.nomorhpuser === nohp);
        res.status(200).send(cariHistory);
    }
});

app.post('/api/addContact',(req,res)=>{
    var nohp = req.body.nomorhpuser;
    var nohp2 = req.body.nomorhptujuan;
    const cariorang = user.find(c=>c.nomorhp === nohp);
    if(!cariorang){ res.status(400).send("nomor hp user tidak ada");}
    else{
        const cariorang1 = user.find(c=>c.nomorhp === nohp2);
        if(!cariorang1){ res.status(400).send("nomor hp tujuan tidak ada");}
        else{
            const kontakBaru = {
                nomorhpuser:nohp,
                nomorhptujuan:nohp2
            };
            kontak.push(kontakBaru);
            res.status(200).send(kontak);
        }
    }
});

app.get('/api/contact',(req,res)=>{
    var nohp = req.body.nomorhpuser;
    const cariorang = user.find(c=>c.nomorhp === nohp);
    if(!cariorang){ res.status(400).send("nomor hp tidak ada");}
    else{
        const cariorang1 = kontak.find(c=>c.nomorhpuser === nohp);
        res.status(200).send(cariorang1);
    }
});

app.get('/api/checkout',(req,res)=>{
    var nohp = req.body.nomorhp;
    const cariorang = user.find(c=>c.nomorhp === nohp);
    if(!cariorang){ res.status(400).send("nomor hp tidak ada");}
    else{
        res.status(200);
    }
});

const port = process.env.port || 8080;

app.listen(port,()=>console.log("Jalan "+port));