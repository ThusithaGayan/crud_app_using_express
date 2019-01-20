var express=require("express");
var bodyParser=require("body-parser");
var mysql=require("mysql");

var app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
});
var pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"
});

con.connect(function(err){
    if(err){
        throw err;
    }
    console.log("sql sever has started");

});
app.get("/",function(req,res){
    res.render("home");
});
app.get("/create",function(req,res){
    res.render("create");
});
app.get("/retrive",function(req,res){
    var sql="select*from student";
    pool.query(sql,function(err,res2,cols){
        if(err){
            throw err;
        }
        //console.log(res2[0].name);
        res.render("retrive",{result:res2});

    });
    
});
app.get("/update",function(req,res){
    res.render("update");
});
app.get("/delete",function(req,res){
    res.render("update");
});

app.post("/create",function(req,res){
    var name=req.body.name;
    var age=req.body.age;
    var sql="Insert into student values('"+name+"','"+age+"');";
    pool.query(sql,function(err,res2,cols){
        if(err){
            throw err;
        }
        res.render("create");
    });
});

app.listen(8080,function(){
    console.log("server has been started");
});