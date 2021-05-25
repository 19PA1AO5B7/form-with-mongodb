var express=require('express')
var app=express()
var mongojs = require('mongojs')
var cString='mongodb+srv://sivaramakrishna:sivaramakrishna@cluster0.wflkq.mongodb.net/StudentForm?retryWrites=true&w=majority'
var db = mongojs(cString, ['Details'])
app.use(express.static('public'))

app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/main.html')
})

app.get('/details',function(req,res){
    var d = {
        Firstname:req.query.fname,
        Lastname:req.query.lname,
        Email:req.query.email,
        Phnumber:req.query.number,
    }

    db.Details.insert(d,function(err,docs){
        if(err){
            res.send("something went wrong")
        }else{
            res.send("added")
        }
    })
})

app.listen(2000)