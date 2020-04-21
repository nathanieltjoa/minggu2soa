const express = require('express');
const app = express();
app.use(express.json());
const user = [];
const items = [];
const history = [];
app.post('/api/register',(req,res)=>{
    const userBaru = {
        nomortelpon: req.body.nomortelpon,
        password: req.body.password,
        nama: req.body.nama,
        email: req.body.email,
        alamat: [req.body.alamat]
    };
    user.push(userBaru);
    res.status(200).send(userBaru);
});
app.post('/api/checkLogin',(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    const cariorang = user.find(c=>c.email === email);
    if(!cariorang){ res.status(400).send("email tidak ada");}
    else {
        if(cariorang.password == password){
            res.status(200).send(cariorang);
        }else{
            res.status(400).send("password tidak sesuai");
        }
    }
});
app.put('/api/updateuser',(req,res)=>{
    var email = req.body.email;
    var nama = req.body.nama;
    var nomortelpon = req.body.nomortelpon;
    const cariorang = user.find(c=>c.email === email);
    if(!cariorang){ res.status(400).send("email tidak ada");}
    else{
        cariorang.nama = nama;
        cariorang.nomortelpon = nomortelpon;
        res.status(200).send(cariorang);
    }
});
app.put('/api/changepassword',(req,res)=>{
    var email = req.body.email;
    var oldpassword = req.body.oldpassword;
    var newpassword = req.body.newpassword;
    const cariorang = user.find(c=>c.email === email);
    if(!cariorang){ res.status(400).send("email tidak ada");}
    else{
        if(cariorang.password == oldpassword){
            cariorang.password = newpassword;
            res.status(200).send(cariorang);
        }else{
            res.status(400).send("password tidak sesuai");
        }
    }
});
app.put('/api/addalamat',(req,res)=>{
    var email = req.body.email;
    var alamat = req.body.alamat;
    const cariorang = user.find(c=>c.email === email);
    if(!cariorang){ res.status(400).send("email tidak ada");}
    else{
        cariorang.alamat.push(alamat);
        res.status(200).send(cariorang);
    }
});
app.delete('/api/removealamat',(req,res)=>{
    var email = req.body.email;
    var alamat = req.body.alamat;
    const cariorang = user.find(c=>c.email === email);
    if(!cariorang){ res.status(400).send("email tidak ada");}
    else{
        var alamatku = cariorang.alamat;
        var index = -1;
        for(var i = 0;i < alamatku.length;i++){
            if(alamatku[i] === alamat){
                index = i;
            }
        }
        if(index != -1){
            cariorang.alamat.splice(index,1);
            res.status(200).send(cariorang);
        }else{
            res.status(400).send("Alamat yang mau dihapus tidak terdaftar");
        }
    }
});
app.post('/api/checkout',(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    var listbarang = req.body.listbarang;
    var jumlah = req.body.jumlah;
    const cariorang = user.find(c=>c.email === email);
    if(!cariorang){ res.status(400).send("email tidak ada");}
    else{
        if(cariorang.password == password){
            const historyBaru = {
                email: email,
                item: listbarang,
                harga: jumlah
            }
            listbarang.forEach(function(lb){
                const checkItem = items.find(c=>c.namaitem === lb.nama);
                if(!checkItem){
                    const id = items.length + 1;
                    const itemku = {
                        id: id,
                        namaitem: lb.nama,
                        harga: lb.harga
                    };
                    items.push(itemku);
                }
            });
            history.push(historyBaru);
            res.status(200).send(historyBaru);
        }else{
            res.status(400).send("password tidak sesuai");
        }
    }
});
app.get('/api/transaksi',(req,res)=>{
    var email = req.body.email;
    const cariemail = history.find(c=>c.email === email);
    if(!cariemail){ res.status(400).send("email tidak ada/tidak ada history transaksi");}
    else{
        const historyCetak = [];
        history.forEach(function(h){
            if(h.email == email){
                historyCetak.push(h);
            }
        });
        res.status(200).send(historyCetak);
    }
});
app.get('/api/items',(req,res)=>{
    if(typeof req.body.hasilcari === 'undefined'){
        res.status(200).send(items);
    }else{
        var hasilcari = req.body.hasilcari;
        const cariitems = items.find(c=>c.id === hasilcari);
        if(!cariitems){res.status(400).send("id(int) tidak ada");}
        else{
            res.status(200).send(cariitems);
        }
    }
});
app.get('/api/items1',(req,res)=>{
    var id = req.body.id;
    const cariitems = items.find(c=>c.id === id);
    if(!cariitems){res.status(400).send("item tidak ada");}
    else{
        res.status(200).send(cariitems);
    }
});
const port = process.env.port || 3000;
app.listen(port,()=>console.log("Jalan "+port));